/*
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 */

'use strict';

let _ = require('lodash'); //MIT

const debug = require('debug');
const log = debug('debug');

let moment = require('moment'); //MIT

var Cloudant = require('@cloudant/cloudant'); // Apache-2.0

const cfenv = require('cfenv'); //Apache-2.0

const appEnv = cfenv.getAppEnv();



class Database {
    /**
     * constructor
     */
    constructor(args) {

        this.apiKey = '';
        this.url = '';

        if (appEnv.isLocal == true) {
            const params = require('../../localdev-config.json');
            if (!params.cloudantCreds) {
                throw "params.cloudantCreds not set";
            }
            if (!params.cloudantCreds.url) {
                throw "params.cloduantCreds.url not set";
            }
            this.url = params.cloudantCreds.url;

            if (!params.cloudantCreds.apiKey) {
                throw "params.cloudantCreds.apiKey not set";
            }
            this.apiKey = params.cloudantCreds.apiKey;
        } else {

            if (!process.env.cloudantUrl) {
                throw "process.env.cloudantUrl not set"
            }
            this.url = process.env.cloudantUrl;

            if (!process.env.cloudantApiKey) {
                throw `process.env.cloudantApiKey not set`
            }
            this.apiKey = process.env.cloudantApiKey;

            // if (!args.apiKey) {
            //     console.log("No apiKey set");
            //     throw "No apiKey set";
            // }
            // this.apiKey = args.apiKey;
            // if (!args.url) {
            //     console.log("No url set");
            //     throw "No url set";
            // }
            // this.url = args.url;
        }

        this.cloudant = new Cloudant({
            url: "https://5f2a2a00-7f60-4e0a-a0c9-c9013d94ae7a-bluemix.cloudantnosqldb.appdomain.cloud",
            maxAttempt: 5,
            plugins: [{ iamauth: { iamApiKey: this.apiKey } }, { retry: { retryDelayMultiplier: 4 } }]
        });

    }


    /**
     *
     */
    async getWhoWeAre() {

        let db = await this.cloudant.db.use('description');

        // await db.index(function(err, result) {
        //     if (err) {
        //         throw err;
        //     }

        //     console.log('The database has %d indexes', result.indexes.length);
        //     for (var i = 0; i < result.indexes.length; i++) {
        //         console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
        //     }

        //     result.should.have.a.property('indexes').which.is.an.Array;
        //     done();
        // });

        // await cloudant.db.create('alice');
        // return cloudant.use('alice').insert({ happy: true }, 'rabbit');

        // await db.get("b7828a44d9ffaccdc6111dbe586e5308")
        //     .then((err, data) => {
        //         if (err)
        //             console.log(err);
        //         console.log(data);
        //     });

        return db.find({ selector: { name: 'whoWeAre' } })
            .then((result) => {

                // console.log('Found %d documents with name whoWeAre', result.docs.length);
                // for (var i = 0; i < result.docs.length; i++) {
                //     console.log('  Doc id: %s', result.docs[i]._id);
                // }

                return { message: result.docs[0].text };
                // return {};
            }).catch(err => {
                console.log(err.stack);
            });
    }

    async insertMetrics(analysisType, data) {
        console.log(`data: ${JSON.stringify(data)}`);

        let db = await this.cloudant.db.use('metrics');

        let datetime = moment().toISOString()
        let timestamp = moment().unix();
        let class_name = data.classifier.top_class;
        let classifier_confidence = data.classifier.top_class_confidence;
        let xfeHighestScore = data.xfe.results.metrics.maxScore || 0;
        let xfeNumAnalyzed_ips = data.xfe.results.metrics.ipsAnalyzed || 0;
        let xfeNumAnalyzed_urls = data.xfe.results.metrics.urlsAnalyzed || 0;

        const doc = {
            "analysisType": analysisType,
            "classifierResult": {
                "class_name": class_name,
                "confidence": classifier_confidence
            },
            "xfeHighestScore": xfeHighestScore,
            "xfeNumAnalyzed": {
                "ips": xfeNumAnalyzed_ips,
                "urls": xfeNumAnalyzed_urls
            },
            "datetime": datetime,
            "timestamp": timestamp
        };

        return db.insert(doc)
            .then((result) => {
                // console.log(JSON.stringify(result));
                return result;
            }).catch(err => {
                console.log(err.stack);
            });
        // .then((err, data) => {
        //     if (err) {
        //         console.log(err);
        //         throw err;
        //     } else {
        //         console.log(data); // { ok: true, id: 'rabbit', ...
        //         return (data.ok);
        //     }
        // });
        //         if (err)
        //             console.log(err);
        //         console.log(data);
        //     });
        // return cloudant.use('alice').insert({ happy: true }, 'rabbit');

        // await db.get("b7828a44d9ffaccdc6111dbe586e5308")
        //     .then((err, data) => {
        //         if (err)
        //             console.log(err);
        //         console.log(data);
        //     });
    }
    async getSecurityTip() {

        let db = await this.cloudant.db.use('security-tips');

        // await db.index(function(err, result) {
        //     if (err) {
        //         throw err;
        //     }

        //     console.log('The database has %d indexes', result.indexes.length);
        //     for (var i = 0; i < result.indexes.length; i++) {
        //         console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
        //     }

        //     result.should.have.a.property('indexes').which.is.an.Array;
        //     done();
        // });

        // await cloudant.db.create('alice');
        // return cloudant.use('alice').insert({ happy: true }, 'rabbit');

        // await db.get("b7828a44d9ffaccdc6111dbe586e5308")
        //     .then((err, data) => {
        //         if (err)
        //             console.log(err);
        //         console.log(data);
        //     });

        return db.find({
                selector: {
                    "_id": {
                        "$gt": "0"
                    }
                }
            })
            .then((result) => {

                // console.log('Found %d documents with name whoWeAre', result.docs.length);

                //Generate random number between 0 and docs.length
                let docIndex = Math.floor(
                        Math.random() * (result.docs.length - 0) + 0
                    )
                    // return { message: result.docs[0].text };
                    // return { "message": "We are cool people doing cool things" }
                return result.docs[docIndex].text;
            }).catch(err => {
                console.log(err.stack);
            });
    }

    async getSecurityRecommendations(type, medium, percent) {

        let db = await this.cloudant.db.use('recommendations');

        percent = Number(percent);

        let query = {
            selector: {
                type: type,
                medium: medium,
                thresholdPercentlow: {
                    "$lt": percent
                },
                thresholdPercenthigh: {
                    "$gt": percent
                }
            },
            fields: [
                "_id",
                "recommendations"
            ]
        };
        // console.log(query);

        return db.find(query)
            .then((result) => {
                // console.log(JSON.stringify(result));
                return result.docs[0].recommendations;
            }).catch(err => {
                console.log(err.stack);
            });
    }

    async getAanalysisType_className_counts() {

        let db = await this.cloudant.db.use('metrics');




        return db.view('metricsIndexes', 'analysisType_className', {
            'group': true,
            // 'reduce': true,
        }).then((body) => {
            // body.rows.forEach((doc) => {
            //     console.log(doc.value);
            // });
            // const totalYears = pilots.reduce((acc, pilot) => acc + pilot.years, 0);
            // return body;
            let returnObj = {
                "numAnalyzed": 0,
                "media": {
                    "sms": 0,
                    "email": 0,
                    "news": 0
                },
                "classifiers": {
                    "totals": {
                        "spam": 0,
                        "ham": 0,
                        "unreliable": 0,
                        "reliable": 0
                    },
                    "email": {
                        "spam": 0,
                        "ham": 0
                    },
                    "sms": {
                        "spam": 0,
                        "ham": 0
                    },
                    "news": {
                        "unreliable": 0,
                        "reliable": 0
                    }
                }
            }
            for (let obj of body.rows) {
                //increase the number analyzed
                returnObj.numAnalyzed += obj.value;

                //get the values for each object
                let object = Object.assign({}, ...obj.key);
                let arr = Object.values(object);

                log(`object: ${JSON.stringify(object)}`);
                log(`arr: ${JSON.stringify(arr)}`);

                returnObj['media'][arr[0]] += obj.value;
                returnObj['classifiers'][arr[0]][arr[1]] += obj.value;
                returnObj['classifiers']['totals'][arr[1]] += obj.value;

            }
            return returnObj;

        }).catch(err => {
            console.log('err:', err.stack);
        });


    }

    async getAnalysisType_Counts() {

        let db = await this.cloudant.db.use('metrics');


        return db.view('metricsIndexes', 'analysisType_count', {
            'group': true,
            // 'reduce': true,
        }).then((body) => {
            return body;
        }).catch(err => {
            console.log('err:', err.stack);
        });


    }
    async getClassName_Counts() {

        let db = await this.cloudant.db.use('metrics');

        return db.view('metricsIndexes', 'class_name_count', {
            'group': true,
            // 'reduce': true,
        }).then((body) => {
            return body;
        }).catch(err => {
            console.log('err:', err.stack);
        });


    }

    async getXfeAnalyzedIPs_counts() {

        let db = await this.cloudant.db.use('metrics');


        return db.view('metricsIndexes', 'xfeAnalyzedIPs_sum', {
            'group': true,
            // 'reduce': true,
        }).then((body) => {

            return { ips: body.rows[0].value };

        }).catch(err => {
            console.log('err:', err.stack);
        });

    }

    async getXfeAnalyzedURLs_counts() {

        let db = await this.cloudant.db.use('metrics');

        return db.view('metricsIndexes', 'xfeAnalyzedURLs_sum', {
            'group': true,
            // 'reduce': true,
        }).then((body) => {
            // body.rows.forEach((doc) => {
            //     console.log(doc.value);
            // });
            return ({ urls: body.rows[0].value });
        }).catch(err => {
            console.log('err:', err.stack);
        });

    }

} // Class

module.exports = Database;