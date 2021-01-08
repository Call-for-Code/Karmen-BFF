var should = require('should');

const database = require(`../../api/helpers/database`);
const Database = new database();

const debug = require('debug');
const log = debug('debug');

const timeout = 10000; // in milliseconds
// const long_timeout = 30000; // in miliseconds

describe.skip('helpers', function() {

    describe('database', function() {


        describe('get who we are', () => {
            it('return a success', done => {
                try {
                    Database.getWhoWeAre().then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get security tip', () => {
            it('return a success', done => {
                try {
                    Database.getSecurityTip().then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get getAanalysisType_className_counts', () => {
            it('return a success', done => {
                try {
                    Database.getAanalysisType_className_counts().then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get analysisType_counts', () => {
            it('return a success', done => {
                try {
                    Database.getAnalysisType_Counts().then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get ClassName_Counts', () => {
            it('return a success', done => {
                try {
                    Database.getClassName_Counts().then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get xfeAnalyzedIPs_counts', () => {
            it('return a success', done => {
                try {
                    Database.getXfeAnalyzedIPs_counts().then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get xfeAnalyzedURLs_counts', () => {
            it('return a success', done => {
                try {
                    Database.getXfeAnalyzedURLs_counts().then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get email spam medium recommendation', () => {
            it('return a success', done => {
                let type = "spam";
                let medium = "email";
                let percent = 0.60;

                try {
                    Database.getSecurityRecommendations(type, medium, percent).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get email spam high recommendation', () => {
            it('return a success', done => {
                let type = "spam";
                let medium = "email";
                let percent = 0.80;

                try {
                    Database.getSecurityRecommendations(type, medium, percent).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get email ham', () => {
            it('return a success', done => {
                let type = "ham";
                let medium = "email";
                let percent = 0.80;

                try {
                    Database.getSecurityRecommendations(type, medium, percent).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get text spam medium recommendation', () => {
            it('return a success', done => {
                let type = "spam";
                let medium = "text";
                let percent = 0.60;

                try {
                    Database.getSecurityRecommendations(type, medium, percent).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get text spam high recommendation', () => {
            it('return a success', done => {
                let type = "spam";
                let medium = "text";
                let percent = 0.80;

                try {
                    Database.getSecurityRecommendations(type, medium, percent).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('get text ham recommendation', () => {
            it('return a success', done => {
                let type = "ham";
                let medium = "text";
                let percent = 0.80;

                try {
                    Database.getSecurityRecommendations(type, medium, percent).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });


        // let data = { "message": { "classifier": { "classifier_id": "626bfcx747-nlc-138", "url": "https://api.us-south.natural-language-classifier.watson.cloud.ibm.com/instances/cdb8514d-ba73-4b83-951a-74c28fd19bfb/v1/classifiers/626bfcx747-nlc-138", "text": "---------- Forwarded message ---------\nFrom: Steve McKay \nDate: Sat, Apr 25, 2020 at 4:57 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: \n\n\nisitspamibm@gmail.com\n\n---------- Forwarded message ---------\nFrom: Steve McKay \nDate: Sat, Apr 25, 2020 at 4:54 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: \n\n\n\n\n---------- Forwarded message ---------\nFrom: Steve McKay \nDate: Sat, Apr 25, 2020 at 4:52 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: \n\n\n\n\n---------- Forwarded message ---------\nFrom: Oʀᴅᴇʀ Cᴏɴғɪʀᴍᴀᴛɪᴏɴ \nDate: Thu, Apr 23, 2020 at 3:10 AM\nSubject: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: \n\n\nDollar General\nSdmckay, 𝑃𝑙𝑒𝑎𝑠𝑒 𝐶𝑜𝑛𝑓𝑖𝑟𝑚 𝑌𝑜𝑢𝑟 $𝟣𝟢𝟢 𝐷𝑜𝑙𝑙𝑎𝑟\n𝐺𝑒𝑛𝑒𝑟𝑎𝑙 𝐺𝑖𝑓𝑡 𝐶𝑎𝑟𝑑 !\n*Click Here*\n\n\n\n\nThe advertiser does not manage your subscription.\nIf you prefer not to receive further communication please unsubscribe here\n\nOr write to: 11310 E 21st St N ,#518, Wichita, KS, 67206\n", "top_class": "spam", "classes": [{ "class_name": "spam", "confidence": 0.9937115045054379 }, { "class_name": "ham", "confidence": 0.006288495494562146 }], "status": 200, "top_class_confidence": 0.9937115045054379 }, "recommendations": "<ol> <li>Do not engage with this email <ul> <li>Do not reply to this email</li> <li>Do not click to any links in this email</li> <li>Do not open any attachments</li> </ul> </li> <li>Report as spam</li> <li>Delete email</li> </ol>", "xfe": { "result": { "results": { "ips": [], "urls": [{ "result": { "application": { "actionDescriptions": { "Audio Chat/Video Chat": "Audio/video communication", "Share": "Share a document, share an audio or video stream, upload a file, attach a file to an email", "Stream/Download": "Listen to an audio stream, watch a video stream, view or save an email attachment or download a file. Not included: View a profile or a post in a social network, view a picture on an image hoster, read the text of an email, view a document in an online collaboration tool", "Write/Post/Chat": "An action that requires the input of plain text (via keyboard or from clipboard). Not included: An upload of a file" }, "actions": { "Audio Chat/Video Chat": true, "Share": true, "Stream/Download": true, "Write/Post/Chat": true }, "baseurl": "http://mail.google.com/", "canonicalName": "gmail", "categories": { "Chat": true, "Instant Messaging": true, "Webmail / Unified Messaging": true }, "categoryDescriptions": { "Chat": "This category contains Web sites with chat rooms and online messengers. Instant Messaging sites are no listed here but in their own category.", "Instant Messaging": "This category contains Web sites that enable users to communicate via Instant Messaging such as ICQ, MSN, AIM, Skype, GTalk, Jabber, Y!M, myspaceim etc.", "Webmail / Unified Messaging": "This category contains Web sites from the area of Web-Personal Information Management (Web-PIM) such as email, calendar, tasks, fax, voicemail etc." }, "description": "An email service provided by Google", "id": 10, "name": "Gmail", "riskfactors": { "SSL ciphers": { "description": "A few hosts of this application support weak ciphers", "value": 10 }, "SSL key size": { "description": "A significant amount of hosts of this application use SSL/TLS certificate key sizes less than 2048", "value": 100 }, "host IPR": { "description": "Several IP addresses for this application have had a bad reputation within the last 30 days", "value": 3 }, "insecure communication": { "description": "Limited parts of this application are provided over an unencrypted connection", "value": 4 }, "link-to categorizations": { "description": "A low proportion of sites linking to this application are suspicious", "value": 3 }, "upload possible": { "description": "The application supports file uploading, which bears a risk of data leakage", "value": 100 } }, "score": 1.5, "urls": ["gmail.com", "gmail.google.com", "googlemail.com", "mail.google.com"] }, "categoryDescriptions": { "Chat": "This category contains Web sites with chat rooms and online messengers. Instant Messaging sites are no listed here but in their own category.", "Cloud": "This category contains Web sites that provide cloud services. That includes infrastructure as a service, such as web hoster. Furthermore, platform as a service. Moreover, software as a service, for example social networks, social media, web storage, and webmail.", "Instant Messaging": "This category contains Web sites that enable users to communicate via Instant Messaging such as ICQ, MSN, AIM, Skype, GTalk, Jabber, Y!M, myspaceim etc.", "Webmail / Unified Messaging": "This category contains Web sites from the area of Web-Personal Information Management (Web-PIM) such as email, calendar, tasks, fax, voicemail etc." }, "cats": { "Chat": true, "Cloud": true, "Instant Messaging": true, "Webmail / Unified Messaging": true }, "score": 1, "url": "gmail.com" }, "tags": [] }, { "result": { "categoryDescriptions": { "Pornography": "Includes Web sites containing the depiction of sexually explicit activities and erotic content unsuitable to persons under the age of 18." }, "cats": { "Pornography": true }, "score": 4, "url": "onehabitchanges.com" }, "tags": [] }, { "result": { "error": "Not Found", "origUrl": "https://t.co/OL14HCgLEi", "url": "https://azedsxw.influencesglobal.com/tgbnhy?cbbbbcccsHP5cvVqTcdczNctcr6LHckzFcbbbbc" } }, { "origUrl": "https://t.co/yWp8Nx7r4E", "result": { "application": { "actionDescriptions": { "Share": "Share a document, share an audio or video stream, upload a file, attach a file to an email", "Write/Post/Chat": "An action that requires the input of plain text (via keyboard or from clipboard). Not included: An upload of a file" }, "actions": { "Share": true, "Write/Post/Chat": true }, "baseurl": "http://twigtale.com/", "canonicalName": "twigtale", "categories": { "Literature / Books": true }, "categoryDescriptions": { "Literature / Books": "This category contains literature such as novels, poems,cooking books and recipes, advisories etc." }, "description": "A platform where parents can create custom stories for children", "id": 4496, "name": "twigtale", "riskfactors": { "malware": { "description": "A significant number of URLs host malware", "value": 100 }, "upload possible": { "description": "The application supports file uploading, which bears a risk of data leakage", "value": 100 } }, "score": 1.4, "urls": ["amazonaws.com", "twigtale.com"] }, "categoryDescriptions": { "Cloud": "This category contains Web sites that provide cloud services. That includes infrastructure as a service, such as web hoster. Furthermore, platform as a service. Moreover, software as a service, for example social networks, social media, web storage, and webmail.", "Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components." }, "cats": { "Cloud": true, "Software / Hardware": true }, "score": 1, "url": "amazonaws.com" }, "tags": [] }], "metrics": { "ipsAnalyzed": 0, "maxIpScore": null, "urlsAnalyzed": 4, "maxUrlScore": 4, "maxScore": 4 } } } } } };
        let data = { "message": { "classifier": { "classifier_id": "afc876x728-nlc-182", "url": "https://api.us-south.natural-language-classifier.watson.cloud.ibm.com/instances/cdb8514d-ba73-4b83-951a-74c28fd19bfb/v1/classifiers/afc876x728-nlc-182", "text": "URGENT ALERT: Mike, please review the details for shipment ID: AmazonRewards 2K1K4 here: e9nlp.info/UzwFS8IE3X http://goo.gl/HwUfwd 1.1.1.1 item $110 goodies", "top_class": "spam", "classes": [{ "class_name": "spam", "confidence": 0.9955680712835411 }, { "class_name": "ham", "confidence": 0.004431928716458984 }], "status": 200, "top_class_confidence": 0.9955680712835411 }, "recommendations": "<ol> <li>Do not engage with this text <ul> <li>Do not reply to this text</li> <li>Do not click to any links in this text</li> <li>Do not open any attachments</li> </ul> </li> <li>Report as spam</li> <li>Delete text</li> </ol>", "xfe": { "results": { "urls": [{ "result": { "url": "e9nlp.info/UzwFS8IE3X", "error": "Not Found" } }, { "result": { "url": "https://github.com", "cats": { "Software / Hardware": true }, "score": 1, "application": { "canonicalName": "github", "name": "GitHub", "description": "A project hosting service ", "actionDescriptions": { "Write/Post/Chat": "An action that requires the input of plain text (via keyboard or from clipboard). Not included: An upload of a file", "Share": "Share a document, share an audio or video stream, upload a file, attach a file to an email" }, "categories": { "Software / Hardware": true }, "categoryDescriptions": { "Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components." }, "id": 727, "actions": { "Write/Post/Chat": true, "Share": true }, "score": 1.4, "baseurl": "http://github.com/", "urls": ["gist.github.com", "github.com", "github.io", "help.github.com"], "riskfactors": { "insecure communication": { "value": 1, "description": "Limited parts of this application are provided over an unencrypted connection" }, "upload possible": { "value": 100, "description": "The application supports file uploading, which bears a risk of data leakage" }, "link categorizations": { "value": 1, "description": "Several external references direct to suspicious content" }, "malware": { "value": 100, "description": "A significant number of URLs host malware" }, "link-to categorizations": { "value": 1, "description": "A low proportion of sites linking to this application are suspicious" } } }, "categoryDescriptions": { "Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components." } }, "associated": [{ "url": "github.com", "cats": { "Software / Hardware": true }, "score": 1, "categoryDescriptions": { "Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components." } }], "tags": [], "origUrl": "http://goo.gl/HwUfwd" }], "ips": [{ "ip": "1.1.1.1", "cats": {}, "geo": { "country": "Australia", "countrycode": "AU" }, "score": 1, "reason": "Firewall deny log analysis", "reasonDescription": "This IP was involved in port scanning activities.", "categoryDescriptions": {}, "tags": [] }], "metrics": { "ipsAnalyzed": 1, "maxIpScore": 1, "urlsAnalyzed": 2, "maxUrlScore": 1, "maxScore": 1 } } } } };
        describe('get text recommendation', () => {
            it('return a success', done => {

                let type = data.message.classifier.top_class;
                log(`type: ${type}`);
                let medium = "text";
                let percent = data.message.classifier.classes.find(o => o.class_name === type).confidence;
                log(`percent: ${percent}`);

                try {
                    Database.getSecurityRecommendations(type, medium, percent).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe.skip('insert metrics', () => {
            it('return a success', done => {
                try {
                    Database.insertMetrics("sms", data).then(res => {
                        // log('Results', JSON.stringify(res));
                        //                         // should.not.exist(err);
                        log(JSON.stringify(res));
                        //                         // expect(res).to.have.property('name');
                        //                         // expect(res.name).to.be.a('string');
                        //                         // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });


    });

});