/* eslint-disable max-len */
/* eslint-disable no-console */

/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

'use strict';

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.
 It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
// const util = require('util');

const axios = require('axios'); //MIT

const cfenv = require('cfenv'); //Apache-2.0

const appEnv = cfenv.getAppEnv();

const xfe = require('../helpers/xfe');
const XFE = new xfe();

const database = require(`../helpers/database`);
const Database = new database();

/**
 * 
 * @param {*} text 
 */
function classifySMS(text) {
    let smsSpamNLCURL = '';
    let apiKey = '';

    try {
        //TODO: Move to NLC Helper
        // get from env
        if (appEnv.isLocal === true) {
            const params = require('../../localdev-config.json');
            if (!params.smsSpamNLCURL) {
                throw "params.smsSpamNLCURL not set";
            }
            smsSpamNLCURL = params.smsSpamNLCURL;

            if (!params.nlcApiKey) {
                throw "params.nlcApiKey not set";
            }
            apiKey = params.nlcApiKey;
        } else {
            if (!process.env.smsSpamNLCURL) {
                throw "process.env.smsSpamNLCURL not set";
            }
            smsSpamNLCURL = process.env.smsSpamNLCURL;

            if (!process.env.nlcApiKey) {
                throw "process.env.nlcApiKey not set";
            }
            apiKey = process.env.nlcApiKey;
        }
        // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

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

        return axios
            .post(smsSpamNLCURL, data, config)
            .then(response => {
                console.log(`response: ${JSON.stringify(response.data)}`);
                response.data.status = 200;
                let top_class = response.data.top_class;
                response.data.top_class_confidence = response.data.classes.find(o => o.class_name === top_class).confidence;
                return (response.data);
            })
            .catch((err) => {
                console.error(err.stack);
                throw Error(err);
            });
    } catch (err) {
        console.error(err.stack);
        throw err;
    }
}

function getSecurityRecommendations(data) {
    let url = '';
    let apiKey = '';

    try {
        // console.log(`data: ${JSON.stringify(data.result)}`);

        let type = data.top_class;
        // console.log(`type: ${type}`);
        let medium = "text";
        let percent = data.top_class_confidence;
        // console.log(`percent: ${percent}`);

        return Database.getSecurityRecommendations(type, medium, percent)
            .then(data => { return data })
            .catch(err => {
                throw err;
            });
    } catch (err) {
        console.log(err.stack);
        throw err
    }
}

/**
 * Functions in a127 controllers used for operations should take two parameters:
 * @param {*} req a handle to the request object
 * @param {*} res a handle to the response object
 */
function analyzeSMS(req, res) {

    try {

        if (!req.swagger.params.text || !req.swagger.params.text.value) {
            throw new Error('req.swagger.params.text.value not set');
        }
        let text = req.swagger.params.text.value;

        //dereference the object
        text = text.text;

        let classifier = classifySMS(text);
        let IoCs = XFE.analyzeIocs(text);

        Promise.all([classifier, IoCs])
            .then(data => {
                //Responses are ordered in the same order they are given in the Promise.all
                //https://stackoverflow.com/questions/48736509/how-does-promise-all-guarantee-return-order-in-es6
                // console.log(`data: ${JSON.stringify(data)}`);
                let classifierData = data[0];
                // console.log(`classifierData: ${JSON.stringify(classifierData)}`);

                return getSecurityRecommendations(classifierData)
                    .then(recommendations => {
                        // console.log(`recommendations: ${JSON.stringify(recommendations)}`);

                        let response = { classifier: data[0], recommendations: recommendations, xfe: data[1] };

                        return Database.insertMetrics('sms', response)
                            .then(result => {
                                return res.status(200).json({ message: response });
                            });

                    }).catch(err => {
                        console.log(err.stack);
                        throw err;
                    })

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
    analyzeSMS,
};