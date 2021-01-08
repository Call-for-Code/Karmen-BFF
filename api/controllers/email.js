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

const cfenv = require('cfenv'); // Apache -2.0

const appEnv = cfenv.getAppEnv();

const xfe = require('../helpers/xfe');
const XFE = new xfe();

const database = require(`../helpers/database`);
const Database = new database();

const debug = require('debug');
const log = debug('debug');

// Main
// exports.main = IsItSpam;


//the env variable __OW_ACTIVATION_ID is only avail when run as a action in a cloud function
//We are seeing if that env variable exists, and if not, assume we are running locally.
// if (!process.env.__OW_ACTIVATION_ID) {
//     const params = require('./localdev-config.json');
// }

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
    analyzeEmail: analyzeEmail
};

/**
 * 
 */
function cleanEmail(text) {
    //remove starting line like: 
    // On Tue, Sep 17, 2002 at 10:19:13AM -0700, Chuck Murcko wrote:\n> Probably because we have this pesky 1st Amendment thing here. Still, \n> lots of us in the States have developed a disturbing tendency to shout \n> down or (in recent years) shackle in legal BS opinions, thoughts, and \n> individual behaviors we don't agree with.\n> \n\nExcept that parroting the party line doesn't really require much\nfreedom of speech. Now if you had posted something from a left of\ncenter source, you would have been shouted down in flames, buried in \nad hominem attacks, and probably get your name added to an FBI list. \n\n \nBesides the basic rule in the United States now is \"I'll defend your\nrights to say anything you want, but if it isn't appropriately\nneoconish, well, don't expect to work\":\n\n\nHHS Seeks Science Advice to Match Bush Views\n\nBy Rick Weiss\nWashington Post Staff Writer\nTuesday, September 17, 2002; Page A01\n\nThe Bush administration has begun a broad restructuring of the\nscientific advisory committees that guide federal policy in areas such\nas patients' rights and public health, eliminating some committees\nthat were coming to conclusions at odds with the president's views and\nin other cases replacing members with handpicked choices. \n...\nhttp://www.washingtonpost.com/wp-dyn/articles/A26554-2002Sep16.html\n\nOwen\n\n\n",

    //remove  starting lines like:
    //   Date:        Wed, 21 Aug 2002 10:54:46 -0500\n    
    // /\s*Date:.*?\\n/gmi
    text = text.replace(/\s*Date:.*?\n/gmi, "");

    // From:        Chris Garrigues <cwg-dated-1030377287.06fa6d@DeepEddy.Com>\n    
    // /\s*From:.*?\\n/gmi
    text = text.replace(/\s*From:.*?\n/gmi, "");

    // Message-ID:  <1029945287.4797.TMDA@deepeddy.vircio.com>\n\n\n  
    //\s*Message-ID:.*?\\n
    text = text.replace(/\s*Message-ID:.*?\n/gmi, "");

    //prepend subject:
    // text = "Subject: " + subject + text;

    //replace html tags
    text = text.replace(/(<([^>]+)>)/igm, "");

    //replace extra spaces
    text = text.replace(/\s+/igm, " ");

    //replace back slashes
    text = text.replace(/\\/igm, "");

    //replace pipe
    text = text.replace(/\|/igm, "");

    //replace \n
    text = text.replace(/\n/igm, "");

    //escape single and double quotes
    // text = text.replace(/"/igm, '\\"').replace(/'/igm, "''");
    text = text.replace(/"/igm, '""');

    //escape commas
    // text = text.replace(/,/igm, '\,');


    //limit to 1024 characters
    if (text.length > 2048) {
        text = text.slice(0, 2048);
        console.log(`test after slice: ${text}`);
        text = text.substr(0, Math.min(text.length, text.lastIndexOf(" ")));
        console.log(`test after substr: ${text}`);
    }


    return text;

}

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function classifyEmail(text) {
    let enronUrl = '';
    let apiKey = '';
    let smsSpamNLCURL = '';
    let spamAssasinUrl = '';
    let mergedSpamNLCURL = '';
    let trec07pSPAMNLCURL = '';

    //the env variable __OW_ACTIVATION_ID is only avail when run as a action in a cloud function
    //We are seeing if that env variable exists, and if not, assume we are running locally.
    try {
        //get from env
        if (appEnv.isLocal == true) {
            const params = require('../../localdev-config.json');

            // if (!params.enronSpamNLCURL) {
            //     throw "params.enronSpamNLCURL not set";
            // }
            // enronUrl = params.enronSpamNLCURL;

            if (!params.spamAssasinNLCURL) {
                throw "params.spamAssasinNLCURL not set";
            }
            spamAssasinUrl = params.spamAssasinNLCURL;

            // if (!params.smsSpamNLCURL) {
            //     throw "params.smsSpamNLCURL not set";
            // }
            // smsSpamNLCURL = params.smsSpamNLCURL;

            // if (!params.mergedSpamNLCURL) {
            //     throw "params.mergedSpamNLCURL not set";
            // }
            // mergedSpamNLCURL = params.mergedSpamNLCURL;

            // if (!params.trec07pSPAMNLCURL) {
            //     throw "params.trec07pSPAMNLCURL not set";
            // }
            // trec07pSPAMNLCURL = params.trec07pSPAMNLCURL;

            if (!params.nlcApiKey) {
                throw "params.nlcApiKey not set";
            }
            apiKey = params.nlcApiKey;
        } else {

            // if (!process.env.enronSpamNLCURL) {
            //     console.log("process.env.enronSpamNLCURL not set");
            //     throw "process.env.enronSpamNLCURL not set";
            // }
            // enronUrl = process.env.enronSpamNLCURL;

            if (!process.env.spamAssasinNLCURL) {
                console.log("process.env.spamAssasinNLCURL not set");
                throw "process.env.spamAssasinNLCURL not set";
            }
            spamAssasinUrl = process.env.spamAssasinNLCURL;

            // if (!process.env.smsSpamNLCURL) {
            //     console.log("process.env.smsSpamNLCURL not set");
            //     throw "process.env.smsSpamNLCURL not set";
            // }
            // smsSpamNLCURL = process.env.smsSpamNLCURL;

            // if (!process.env.mergedSpamNLCURL) {
            //     console.log("process.env.mergedSpamNLCURL not set");
            //     throw "process.env.mergedSpamNLCURL not set";
            // }
            // mergedSpamNLCURL = process.env.mergedSpamNLCURL;


            // if (!process.env.trec07pSPAMNLCURL) {
            //     console.log("process.env.trec07pSPAMNLCURL not set");
            //     throw "process.env.trec07pSPAMNLCURL not set";
            // }
            // trec07pSPAMNLCURL = process.env.trec07pSPAMNLCURL;

            if (!process.env.nlcApiKey) {
                console.log("process.env.nlcApiKey not set");
                throw "process.env.nlcApiKey not set";
            }
            apiKey = process.env.nlcApiKey;

        }

        // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
        // if (!req.swagger.params.text.value) {
        //     throw "req.swagger.params.text.value not set"
        // }
        // var text = req.swagger.params.text.value;

        // const data = { "input": "---------- Forwarded message ---------\nFrom: Steve McKay <sdmckay1@gmail.com>\nDate: Sat, Apr 25, 2020 at 4:57 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <isitspamibm@gmail.com>\n\n\nisitspamibm@gmail.com\n\n---------- Forwarded message ---------\nFrom: Steve McKay <sdmckay1@gmail.com>\nDate: Sat, Apr 25, 2020 at 4:54 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <isitspamibm@gmail.com>\n\n\n\n\n---------- Forwarded message ---------\nFrom: Steve McKay <sdmckay1@gmail.com>\nDate: Sat, Apr 25, 2020 at 4:52 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <itisspamibm@gmail.com>\n\n\n\n\n---------- Forwarded message ---------\nFrom: Oʀᴅᴇʀ Cᴏɴғɪʀᴍᴀᴛɪᴏɴ <nooreply@vw5.onehabitchanges.com>\nDate: Thu, Apr 23, 2020 at 3:10 AM\nSubject: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <sdmckay1@gmail.com>\n\n\nDollar General\nSdmckay, 𝑃𝑙𝑒𝑎𝑠𝑒 𝐶𝑜𝑛𝑓𝑖𝑟𝑚 𝑌𝑜𝑢𝑟 $𝟣𝟢𝟢 𝐷𝑜𝑙𝑙𝑎𝑟\n𝐺𝑒𝑛𝑒𝑟𝑎𝑙 𝐺𝑖𝑓𝑡 𝐶𝑎𝑟𝑑 !\n*Click Here*\n<https://t.co/OL14HCgLEi?amp=1>\n\n\n\nThe advertiser does not manage your subscription.\nIf you prefer not to receive further communication please unsubscribe here\n<https://t.co/yWp8Nx7r4E?amp=1>\nOr write to: 11310 E 21st St N ,#518, Wichita, KS, 67206\n" };

        //TODO: Move to common module
        if (!text) {
            console.log("No text supplied");
            throw "No text supplied";
        }

        console.log(`data before clean: ${text}`);

        const data = { text: cleanEmail(text) };

        console.log(`data after clean: `, data);

        // const data = text;

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

        log(`Classify Email - data: ${data}`);

        // let enronClassifier = axios
        //     .post(enronUrl, data, config)
        //     .then(response => {
        //         return (response.data);
        //     })
        //     .catch((err) => {
        //         console.error(err.stack);
        //         throw Error(err);
        //     });

        let spamAssassinClassifier = axios
            .post(spamAssasinUrl, data, config)
            .then(response => {
                return (response.data);
            })
            .catch((err) => {
                console.error(err.stack);
                throw Error(err);
            });

        // let smsClassifier = axios
        //     .post(smsSpamNLCURL, data, config)
        //     .then(response => {
        //         return (response.data);
        //     })
        //     .catch((err) => {
        //         console.error(err.stack);
        //         throw Error(err);
        //     });
        // let mergedClassifier = axios
        //     .post(mergedSpamNLCURL, data, config)
        //     .then(response => {
        //         return (response.data);
        //     })
        //     .catch((err) => {
        //         console.error(err.stack);
        //         throw Error(err);
        //     });

        // let trec07p = axios
        //     .post(trec07pSPAMNLCURL, data, config)
        //     .then(response => {
        //         return (response.data);
        //     })
        //     .catch((err) => {
        //         console.error(err.stack);
        //         throw Error(err);
        //     });

        //TODO: compare against Enron, Spamassasin and SMS classifiers
        // return Promise.all([enronClassifier, spamAssassinClassifier, smsClassifier, mergedClassifier, trec07p])
        return Promise.all([spamAssassinClassifier])
            // Promise.all([classifier])
            .then(data => {
                // console.log(`data: ${JSON.stringify(data)}`);
                //Responses are ordered in the same order they are given in the Promise.all
                //https://stackoverflow.com/questions/48736509/how-does-promise-all-guarantee-return-order-in-es6
                // let enronData = data[0];
                // let smsData = data[1];

                // console.log(`ENRON: `, JSON.stringify(enronData));
                // console.log(`SMS: `, JSON.stringify(smsData));

                //Find the classifier with the highest Confidence
                let top_class_confidence = 0.0;
                let topClassifier = {};
                let topClassifiers = { spam: {}, ham: {} };
                let counts = { spam: 0, ham: 0 };
                let confidence = { spam: 0.0, ham: 0.0 };

                for (const item of data) {
                    // console.log(`item: ${JSON.stringify(item)}`);

                    let itemTopClassConfidence = item.classes.find(o => o.class_name === item.top_class).confidence;

                    console.log(`classifier: ${item.classifier_id}, top_class: ${item.top_class}, confidence: ${itemTopClassConfidence}`);
                    counts[item.top_class] += 1;
                    // confidence[item.top_class] = itemTopClassConfidence;

                    if (itemTopClassConfidence > confidence[item.top_class]) {
                        //     log(`new top classifier`);
                        item.top_class_confidence = itemTopClassConfidence;
                        topClassifiers[item.top_class] = item;
                        // top_class_confidence = itemTopClassConfidence;
                        confidence[item.top_class] = itemTopClassConfidence;
                        topClassifiers[item.top_class].top_class_confidence = itemTopClassConfidence;
                    }
                }

                //Determine the top class
                if (counts.spam > counts.ham) {
                    console.log(`top classifier - spam`);
                    topClassifier = topClassifiers.spam;
                } else {
                    console.log(`top classifier - ham`);
                    topClassifier = topClassifiers.ham;
                }

                //remove unneeded fields
                // delete topClassifier.classifier_id;
                delete topClassifier.url;
                delete topClassifier.text;

                log(`classifierData: ${JSON.stringify(topClassifier)}`);

                return topClassifier;

                // return res.status(200).json({ message: topClassifier });
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
        console.log(err.stack);
        // res.status(500).json({ message: err.stack });
        throw err;
    }

    // this sends back a JSON response which is a single string


}

function getSecurityRecommendations(data) {
    try {
        // console.log(`data: ${JSON.stringify(data.result)}`);

        let type = data.top_class;
        // console.log(`type: ${type}`);
        let medium = "email";
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
function analyzeEmail(req, res) {

    try {

        if (!req.swagger.params.text || !req.swagger.params.text.value) {
            throw new Error('req.swagger.params.text.value not set');
        }
        let text = req.swagger.params.text.value;

        //dereference text
        text = text.text;

        let classifier = classifyEmail(text);
        let IoCs = XFE.analyzeIocs(text);

        Promise.all([classifier, IoCs])
            // Promise.all([classifier])
            .then(data => {

                //Responses are ordered in the same order they are given in the Promise.all
                //https://stackoverflow.com/questions/48736509/how-does-promise-all-guarantee-return-order-in-es6
                let classifierData = data[0];
                // console.log(`classifierData: ${JSON.stringify(classifierData)}`);

                // return res.status(200).json({ message: classfierData });

                return getSecurityRecommendations(classifierData)
                    .then(recommendations => {
                        // console.log(`recommendations: ${JSON.stringify(recommendations)}`);

                        // let response = { classifier: data[0], recommendations: recommendations, xfe: data[1] };
                        let response = { classifier: data[0], recommendations: recommendations, xfe: data[1] };

                        return Database.insertMetrics('email', response)
                            .then(result => {
                                return res.status(200).json({ message: response });
                            });
                        // console.log(`response: ${JSON.stringify(response)}`);


                    }).catch(err => {
                        console.log(err.stack);
                        throw err;
                    })

                return res.status(200).json({ message: response });
            });



    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: err.stack });
    }

    // this sends back a JSON response which is a single string
}