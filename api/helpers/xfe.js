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
const debug = require('debug');
const log = debug('debug');

const axios = require('axios');

const cfenv = require('cfenv');

const appEnv = cfenv.getAppEnv();

let _ = require('lodash'); //MIT

const btoa = require('btoa'); //MIT

const tall = require('tall').default; //MIT 

var url = require('url');

var uu = require('url-unshort')({
    nesting: 5
});

const axiosRetry = require('axios-retry');

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

//Uncomment the following to enable axios debugging
// require('axios-debug-log');

// axios.interceptors.request.use(request => {
//     log('Starting Request', request);
//     return request;
// });

// axios.interceptors.response.use(response => {
//     log('Response:', JSON.stringify(response.data));
//     return response;
// });

class XFE {
    /**
     * constructor
     */
    constructor(args) {

        this.moduleName = 'xfe';
        this.xfeUrl = '';
        this.xfeUsername = '';
        this.xfePassword = '';

        if (appEnv.isLocal === true) {
            const params = require('../../localdev-config.json');

            if (!params.xfeCreds) {
                throw new Error('params.xfeCreds not set');
            }
            if (!params.xfeCreds.url) {
                throw new Error('params.xfeCreds.url not set');
            }
            this.xfeBaseUrl = params.xfeCreds.url;

            if (!params.xfeCreds.userName) {
                throw new Error('params.xfeCreds.userName not set');
            }
            this.xfeUsername = params.xfeCreds.userName;

            if (!params.xfeCreds.password) {
                throw new Error('params.xfeCreds.password not set');
            }
            this.xfePassword = params.xfeCreds.password;
        } else {
            if (!process.env.xfeUrl) {
                throw new Error('process.env.xfeCreds.url not set');
            }
            this.xfeBaseUrl = process.env.xfeUrl;

            if (!process.env.xfeUserName) {
                throw new Error('process.env.xfeUserName not set');
            }
            this.xfeUsername = process.env.xfeUserName;

            if (!process.env.xfePassword) {
                throw new Error('process.env.xfePassword not set');
            }
            this.xfePassword = process.env.xfePassword;

        }

        // if (!args.url) {
        //     throw "url not set";
        // }
        // this.xfeBaseUrl = args.url; //TODO: Pull from config
        // if (!args.username) {
        //     throw "xfeUserName not set";
        // }
        // this.xfeUsername = args.username; //TODO: Pull from config
        // if (!args.password) {
        //     throw "xfePassword not set";
        // }
        // this.xfePassword = args.password; //TODO: Pull from config
    }

    addMetrics(data) {
        try {
            return new Promise((resolve, reject) => {
                log(`data: ${JSON.stringify(data)}`);
                let ipArr = data.results.ips;
                let ipsAnalyzed = ipArr.length;
                let maxIpScore = Math.max.apply(Math, ipArr.map(function(o) { return o.score || 0; }));

                let urlArr = data.results.urls;
                let urlsAnalyzed = urlArr.length;
                let maxUrlScore = Math.max.apply(Math, urlArr.map(function(o) { return o.result.score || 0; }));

                let maxScore = maxIpScore > maxUrlScore ? maxIpScore : maxUrlScore;

                log(`ipsAnalyzed: ${ipsAnalyzed}, maxIPScore: ${maxIpScore}, urlsAnalyzed: ${urlsAnalyzed}, maxUrlScore: ${maxUrlScore}, maxScore: ${maxScore}`);


                data.results['metrics'] = { ipsAnalyzed, maxIpScore, urlsAnalyzed, maxUrlScore, maxScore };
                resolve(data);
            });
        } catch (err) {
            console.error(err);
        }

    }

    /**
     * 
     * @param {        //https://loige.co/unshorten-expand-short-urls-with-node-js/} url 
     */
    async _unshortenURL(url) {
        //https://loige.co/unshorten-expand-short-urls-with-node-js/

        let unshortenedUrl = "";

        try {
            log(`orig url ${url}`);
            //unshortenedUrl = await tall(url);
            unshortenedUrl = await uu.expand(url);
            if (!unshortenedUrl) {
                return url;
            }
            log('unshortened url', unshortenedUrl);

        } catch (err) {
            console.error(err.stack);
        }

        return unshortenedUrl;

    }

    /**
     *
     * @param {*} ip
     */
    async _getURLReputation(url) {
        const functionName = `${this.moduleName}/getURLReputation`;
        log(`${functionName} - url: ${url}`);

        // TODO: check valid url
        // logger.debug(`[${functionName}]`);
        // if (NODE_ENV === 'demo') {
        //     logger.debug(`[${functionName}] - Returning demo data`);
        //     return demoJson.ipReputation;
        // }    

        //TODO: resolve any shortened URLS
        // log(`Orig url: ${url}`);
        // if (url.startsWith('http')) {
        let unshortenedUrl = await this._unshortenURL(url);

        //get the domain
        // if (url.startsWith('http')) {
        //     var res = url.split("/");
        //     if (res[2]) {
        //         url = res[2];
        //     }
        // }
        log(`unshortened domain: ${unshortenedUrl}`);


        // const authorization = btoa(`${this.xfeUsername}:${this.xfePassword}`);
        const config = {
            headers: {
                Accept: 'application/json',
            },
            auth: {
                username: this.xfeUsername,
                password: this.xfePassword
            }
        };

        let xfeURL = `${this.xfeBaseUrl}/url/${unshortenedUrl}`;
        // log(`url: ${xfeURL}`);
        // logger.debug(`[${functionName}] - Querying XFE`);
        let data;

        return axios
            // .get("https://api.xforce.ibmcloud.com/url/alamasuak-purchasenyo-id.co", config)
            .get(xfeURL, config)
            .then(
                response => {
                    if (unshortenedUrl != url) {
                        response.data.origUrl = url;
                    }
                    return response.data
                }
            )
            .catch((err) => {
                console.error(err.stack);

                if (err.response.status == 404) {
                    // return { status: err.response.status, result: { url, response: err.response.statusText } };
                    let result = {
                        "result": { "url": unshortenedUrl, "error": err.response.statusText }
                    }
                    if (unshortenedUrl != url) {
                        result.result.origUrl = url;
                    }
                    log(`returning: ${JSON.stringify(result)}`);
                    return (result);
                }
                throw err;

            });

    }

    /**
     *
     * @param {*} ip
     */
    async _getIPReputation(ip) {
        const functionName = `${this.moduleName}/getIPReputation`;
        // logger.debug(`${functionName} - ip: ${ip}`);

        // TODO: check valid ip
        // logger.debug(`[${functionName}]`);
        // if (NODE_ENV === 'demo') {
        //     logger.debug(`[${functionName}] - Returning demo data`);
        //     return demoJson.ipReputation;
        // }

        const config = {
            headers: {
                Accept: 'application/json',
            },
            auth: {
                username: this.xfeUsername,
                password: this.xfePassword
            }
        };

        // logger.debug(`[${functionName}] - Querying XFE`);

        return axios
            .get(`${this.xfeBaseUrl}/ipr/${ip}`, config)
            .then(response => {
                delete response.data.history;
                delete response.data.subnets;
                return response.data;
            })
            .catch((err) => {
                console.error(err.stack);
                if (err.response.data.status == 404) {
                    // return { status: err.response.status, result: { url, response: err.response.statusText } };
                    return ({
                        "result": { "url": url, "error": error.response.statusText }

                    });
                    throw err;
                }
            });
    }

    /**
     * 
     * @param {*} emailUser 
     * @param {*} emailPassword 
     * @param {*} emailService 
     * @param {*} recipients 
     * @param {*} subject 
     * @param {*} html 
     * @param {*} data 
     */
    async analyze(data = null) {
        // log("*** Security.analyze");

        // return new Promise((resolve, reject) => {

        // log(data);
        let results = {};

        //if there are urls:
        let urls = [];
        let ips = [];
        try {

            //TODO: Promisify

            if (data.urls) {

                //use a for instead of forEach, forEach is not promise aware
                for (const url of data.urls) {
                    log(`url: ${url}`);
                    if (url) {
                        let response = await this._getURLReputation(url);
                        if (response) {
                            urls.push(response);
                        }
                    }

                }
            }
            results.urls = urls;


            if (data.ips) {

                //use a for instead of forEach, forEach is not promise aware
                for (const ip of data.ips) {
                    log(`ip: ${ip}`);
                    if (ip) {
                        let response = await this._getIPReputation(ip);
                        if (response) {
                            ips.push(response);
                        }
                    }

                }
            }
            results.ips = ips;

        } catch (err) {
            throw (err);
        }

        return ({ results });
    }


    /**
     * 
     * @param {*} text 
     */
    async parseIoCs(text) {
            log(`Security.parseIoCs text: ${JSON.stringify(text)}`);

            return new Promise((resolve, reject) => {
                try {
                    const html = text.toString();
                    log(`html: `, html);
                    // parse url from email body
                    // let urlRegexp = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?/g;
                    let urlRegexp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
                    let urlMatches = html.match(urlRegexp);

                    // log (`urls: `)
                    // const urls = _.uniq(urlMatches);

                    let domains = [];
                    for (let x in urlMatches) {
                        let hostname = url.parse(urlMatches[x]).hostname;
                        if (hostname) {
                            hostname = hostname.replace(/^\s*www\./gmi, "");
                            domains.push("http://" + hostname);
                        }

                    }

                    let urls = _.uniq(domains);


                    log(`domains: ${JSON.stringify(domains)}`);

                    let emailRegexp = /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/g;
                    let emailMatches = html.match(emailRegexp);
                    const emails = _.uniq(emailMatches);

                    let ipRegexp = /(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;
                    let ipMatches = html.match(ipRegexp);
                    const ips = _.uniq(ipMatches);

                    // let array = [...str.matchAll(regexp)];

                    //parse email from email body
                    // regexp = /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/g;
                    // matches = email.html.match(regexp);
                    // const html_email = _.uniq(matches);
                    // // log(html_email);

                    // //parse email in to field
                    // matches = email.to.html.match(regexp);
                    // const to_email = _.uniq(matches);
                    // // log(to_email);

                    // //parse email in from field
                    // matches = email.from.html.match(regexp);
                    // const from_email = _.uniq(matches);
                    // // log(from_email);
                    // log(`domains: `, domains);
                    log({ urls, ips, emails });
                    resolve({ urls, ips, emails });
                } catch (err) {
                    log(err.stack);
                    reject(err);
                }

            }).catch(err => {
                throw (err);
            });
        } //parseIoCs

    async analyzeIocs(text) {
        try {
            // log(`\nparams: ${JSON.stringify(params)}`);
            // log(params);
            // log(`\nemailSpamNLCCreds: ${JSON.stringify(params.emailSpamNLCCreds)}`);
            // if (!params.emailSpamNLCCreds) {
            //     throw "params.emailSpamNLCCreds not set";
            // }
            // const EmailSpamNLC = new emailSpamNLC(params.emailSpamNLCCreds);

            if (!text) {
                throw "params.text not set";
            }

            log(`\n***** AnalyzingIoCs - text: ${text}*****`);

            // try {
            //     // get from env
            //     if (appEnv.isLocal === true) {
            //         const params = require('../../localdev-config.json');
            //         if (!params.xfeCreds) {
            //             throw new Error('params.xfeCreds not set');
            //         }
            //         if (!params.xfeCreds.url) {
            //             throw new Error('params.xfeCreds.url not set');
            //         }
            //         url = params.xfeCreds.url;

            //         if (!params.xfeCreds.apiKey) {
            //             throw new Error('params.xfeCreds.apiKey not set');
            //         }
            //         apiKey = params.xfeCreds.apiKey;
            //     } else {
            //         if (!process.env.xfeUrl) {
            //             throw new Error('process.env.xfeUrl not set');
            //         }
            //         url = process.env.xfeUrl;

            //         if (!process.env.xfeApiKey) {
            //             throw new Error('process.env.xfeApiKey not set');
            //         }
            //         apiKey = process.env.xfeApiKey;
            //     }
            //     // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

            // const config = {
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         'X-IBM-Client-Id': this.apiKey,
            //     },
            // };

            return this.parseIoCs(text)
                .then(IoCs => {
                    log(IoCs);
                    // return IoCs;

                    return this.analyze(IoCs)
                        .then(data => {
                            data = this.addMetrics(data);
                            log(data)
                            return (data);
                        })
                })
                // let data = await EmailSpamNLC.classify(params.text);
                // log(`\nreturning data: ${JSON.stringify(data)}`);
                // return { success: 'ok' };
        } catch (err) { //try
            console.error(err);
            return { message: JSON.stringify(err) };

        }

    }
}


// /**
//  * 
//  * @param {*} text 
//  */
// function analyzeIocs_old(text) {
//     let url = '';
//     let apiKey = '';

//     try {
//         // get from env

//         // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

//         const config = {
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-IBM-Client-Id': apiKey,
//             },
//         };


//         const data = text;
//         // log(`config: ${JSON.stringify(config)}`);
//         // log(`url: ${JSON.stringify(url)}`);
//         // log(`data: ${JSON.stringify(data)}`);

//         return axios
//             .post(url, data, config)
//             .then(response => {
//                 log(JSON.stringify(response.data));

//                 //Remove history from ips and urls
//                 for (let item of response.data.result.results.ips) {
//                     delete item.history;
//                 }
//                 for (let item of response.data.result.results.urls) {
//                     delete item.history;
//                 }
//                 let data = addMetrics(response.data);
//                 return (data);
//             })
//             .catch((err) => {
//                 console.error(err.stack);
//                 return ({});
//                 throw Error(err);
//             });
//     } catch (err) {
//         console.error(err.stack);
//         // throw err;
//     }
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
module.exports = XFE;