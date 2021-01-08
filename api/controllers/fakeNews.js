'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
// var util = require('util');

const axios = require('axios'); //MIT

const cfenv = require('cfenv'); // Apache-2.0

const appEnv = cfenv.getAppEnv();

const cheerio = require('cheerio'); //MIT

const xfe = require('../helpers/xfe');
const XFE = new xfe();

const database = require(`../helpers/database`);
const Database = new database();

// Main
// exports.main = IsItSpam;

//the env variable __OW_ACTIVATION_ID is only avail when run as a action in a cloud function
//We are seeing if that env variable exists, and if not, assume we are running locally.
// if (!process.env.__OW_ACTIVATION_ID) {
//     const params = require('./localdev-config.json');
// }




/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function classifyFakeNews(text) {
    let url = '';
    let apiKey = '';

    //TODO: Move to NLC helper

    try {
        //get from env
        if (appEnv.isLocal == true) {
            const params = require('../../localdev-config.json');
            if (!params.fakeNewsNLCCreds) {
                throw "params.fakeNewsNLCCreds not set";
            }
            if (!params.fakeNewsNLCCreds.url) {
                throw "params.fakeNewsNLCCreds.url not set";
            }
            url = params.fakeNewsNLCCreds.url;

            if (!params.fakeNewsNLCCreds.apiKey) {
                throw "params.fakeNewsNLCCreds.apiKey not set";
            }
            apiKey = params.fakeNewsNLCCreds.apiKey;
        } else {

            if (!process.env.fakeNewsUrl) {
                throw "process.env.fakeNewsUrl not set"
            }
            url = process.env.fakeNewsUrl;

            if (!process.env.fakeNewsApiKey) {
                throw `process.env.fakeNewsApiKey not set`
            }
            apiKey = process.env.fakeNewsApiKey;
        }

        const config_old = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-IBM-Client-Id': apiKey,
            },
        };

        const config = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            auth: {
                username: 'apikey',
                password: apiKey
            },
        };

        //TODO: Move to common module
        if (!text) {
            console.log("No text supplied");
            throw "No text supplied";
        }

        //replace html tags
        text = text.replace(/(<([^>]+)>)/ig, "");
        //escape single and double quotes
        text = text.replace(/"/g, '\\"').replace(/'/g, "''");


        // //get the middle 2048 characters
        let numchars = text.length;
        if (numchars > 2048) {
            let index = numchars - 2048;
            index /= 2;
            console.log(index);

            text = text.slice(index, -index);
            console.log(text);
        }


        const data = { text };


        // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
        // if (!req.swagger.params.text.value) {
        //     throw "req.swagger.params.text.value not set"
        // }

        // var data = text;

        return axios
            .post(url, data, config)
            .then(response => {
                console.log(JSON.stringify(response.data));
                response.data.status = 200;
                let top_class = response.data.top_class;
                response.data.top_class_confidence = response.data.classes.find(o => o.class_name === top_class).confidence;
                return (response.data);
            })
            .catch((err) => {
                console.error(err.stack);
                throw Error(err);
            });

        // return axios
        //     .post(url, data, config)
        //     .then(response => {
        //         res.status(200).json({ message: { classifier: response.data } });
        //     })
        //     .catch((err) => {
        //         console.log
        //         res.status(500).json({ message: JSON.stringify(err) });
        //     });
    } catch (err) {
        console.error(err.stack);
        // res.status(500).json({ message: err.stack });
        throw err;
    }

    // this sends back a JSON response which is a single string


}

function scrapeUrl(url) {
    // const functionName = `${this.moduleName}/classifyUrl`;

    return axios.get(url)
        .then((response) => {
            console.log("got page");
            if (response.status === 200) {
                let $ = cheerio.load(response.data);

                let body = $('body');

                // console.log(body.text());

                return body.text();

            }
        }, (error) => console.log(error));

}

/**
 * Functions in a127 controllers used for operations should take two parameters:
 * @param {*} req a handle to the request object
 * @param {*} res a handle to the response object
 */
function analyzeFakeNewsURL(req, res) {


    try {

        if (!req.swagger.params.url || !req.swagger.params.url.value) {
            throw new Error('req.swagger.params.url.value not set');
        }
        let urlObj = req.swagger.params.url.value;
        let url = urlObj.url;

        console.log(`getting url: ${url}`);



        return scrapeUrl(url)
            .then(text => {
                // console.log(`got text: ${text}`);
                //replace html tags
                text = text.replace(/(<([^>]+)>)/ig, "");
                //escape single and double quotes
                text = text.replace(/"/g, '\\"').replace(/'/g, "''");

                // //get the middle 2040 characters
                let numchars = text.length;
                if (numchars > 2040) {
                    let index = numchars - 2040;
                    index /= 2;
                    index = Math.floor(index);

                    // console.log(index);

                    text = text.slice(index, -index);
                    console.log(text);
                }

                //dereference the object
                // text = text.text;

                let classifier = classifyFakeNews(text);
                let IoCs = XFE.analyzeIocs(text);

                return Promise.all([classifier, IoCs])
                    .then(data => {
                        //Responses are ordered in the same order they are given in the Promise.all
                        //https://stackoverflow.com/questions/48736509/how-does-promise-all-guarantee-return-order-in-es6
                        let response = { classifier: data[0], xfe: data[1] };

                        return Database.insertMetrics('news', response)
                            .then(result => {
                                return res.status(200).json({ message: response });
                            });
                    });
            })




    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: err.stack });
    }

    // this sends back a JSON response which is a single string
}


/**
 * Functions in a127 controllers used for operations should take two parameters:
 * @param {*} req a handle to the request object
 * @param {*} res a handle to the response object
 */
function analyzeFakeNews(req, res) {

    try {

        if (!req.swagger.params.text || !req.swagger.params.text.value) {
            throw new Error('req.swagger.params.text.value not set');
        }
        let text = req.swagger.params.text.value;

        console.log(`text: ${JSON.stringify(text)}`);

        //dereference the object
        text = text.text;

        let classifier = classifyFakeNews(text);
        let IoCs = XFE.analyzeIocs(text); //TODO: pre-parse to look for ips/urls before calling

        Promise.all([classifier, IoCs])
            .then(data => {
                //Responses are ordered in the same order they are given in the Promise.all
                //https://stackoverflow.com/questions/48736509/how-does-promise-all-guarantee-return-order-in-es6
                //TOOD: need fakenews recommendations
                let response = { classifier: data[0], xfe: data[1] };

                return Database.insertMetrics('news', response)
                    .then(result => {
                        return res.status(200).json({ message: response });
                    });
            });



    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: err.stack });
    }

    // this sends back a JSON response which is a single string
}

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    analyzeFakeNewsURL: analyzeFakeNewsURL,
    analyzeFakeNews: analyzeFakeNews
}