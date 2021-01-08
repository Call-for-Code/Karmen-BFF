var should = require('should');

const xfe = require(`../../api/helpers/xfe`);
const XFE = new xfe();

const debug = require('debug');
const log = debug('debug');

const timeout = 10000; // in milliseconds
// const long_timeout = 30000; // in miliseconds

// const text = "<p>---------- Forwarded message ---------<br/>From: Steve McKay &lt;<a href=\"mailto:sdmckay1@gmail.com\">sdmckay1@gmail.com</a>&gt;<br/>Date: Sat, Apr 25, 2020 at 4:57 PM<br/>Subject: Fwd: &#x157C;I Sdmckay , &#x1D416;&#x1D41E; &#x1D407;&#x1D41A;&#x1D42F;&#x1D41E; &#x1D403;&#x1D428;&#x1D425;&#x1D425;&#x1D41A;&#x1D42B; &#x1D406;&#x1D41E;&#x1D427;&#x1D41E;&#x1D42B;&#x1D41A;&#x1D425;<br/>&#x1D416;&#x1D422;&#x1D427;&#x1D427;&#x1D41E;&#x1D42B;&#x1D42C;...<br/>To: &lt;<a href=\"mailto:isitspamibm@gmail.com\">isitspamibm@gmail.com</a>&gt;</p><p><a href=\"mailto:isitspamibm@gmail.com\">isitspamibm@gmail.com</a></p><p>---------- Forwarded message ---------<br/>From: Steve McKay &lt;<a href=\"mailto:sdmckay1@gmail.com\">sdmckay1@gmail.com</a>&gt;<br/>Date: Sat, Apr 25, 2020 at 4:54 PM<br/>Subject: Fwd: &#x157C;I Sdmckay , &#x1D416;&#x1D41E; &#x1D407;&#x1D41A;&#x1D42F;&#x1D41E; &#x1D403;&#x1D428;&#x1D425;&#x1D425;&#x1D41A;&#x1D42B; &#x1D406;&#x1D41E;&#x1D427;&#x1D41E;&#x1D42B;&#x1D41A;&#x1D425;<br/>&#x1D416;&#x1D422;&#x1D427;&#x1D427;&#x1D41E;&#x1D42B;&#x1D42C;...<br/>To: &lt;<a href=\"mailto:isitspamibm@gmail.com\">isitspamibm@gmail.com</a>&gt;</p><p>---------- Forwarded message ---------<br/>From: Steve McKay &lt;<a href=\"mailto:sdmckay1@gmail.com\">sdmckay1@gmail.com</a>&gt;<br/>Date: Sat, Apr 25, 2020 at 4:52 PM<br/>Subject: Fwd: &#x157C;I Sdmckay , &#x1D416;&#x1D41E; &#x1D407;&#x1D41A;&#x1D42F;&#x1D41E; &#x1D403;&#x1D428;&#x1D425;&#x1D425;&#x1D41A;&#x1D42B; &#x1D406;&#x1D41E;&#x1D427;&#x1D41E;&#x1D42B;&#x1D41A;&#x1D425;<br/>&#x1D416;&#x1D422;&#x1D427;&#x1D427;&#x1D41E;&#x1D42B;&#x1D42C;...<br/>To: &lt;<a href=\"mailto:itisspamibm@gmail.com\">itisspamibm@gmail.com</a>&gt;</p><p>---------- Forwarded message ---------<br/>From: O&#x280;&#x1D05;&#x1D07;&#x280; C&#x1D0F;&#x274;&#x493;&#x26A;&#x280;&#x1D0D;&#x1D00;&#x1D1B;&#x26A;&#x1D0F;&#x274; &lt;<a href=\"mailto:nooreply@vw5.onehabitchanges.com\">nooreply@vw5.onehabitchanges.com</a>&gt;<br/>Date: Thu, Apr 23, 2020 at 3:10 AM<br/>Subject: &#x157C;I Sdmckay , &#x1D416;&#x1D41E; &#x1D407;&#x1D41A;&#x1D42F;&#x1D41E; &#x1D403;&#x1D428;&#x1D425;&#x1D425;&#x1D41A;&#x1D42B; &#x1D406;&#x1D41E;&#x1D427;&#x1D41E;&#x1D42B;&#x1D41A;&#x1D425;<br/>&#x1D416;&#x1D422;&#x1D427;&#x1D427;&#x1D41E;&#x1D42B;&#x1D42C;...<br/>To: &lt;<a href=\"mailto:sdmckay1@gmail.com\">sdmckay1@gmail.com</a>&gt;</p><p>Dollar General<br/>Sdmckay, &#x1D443;&#x1D459;&#x1D452;&#x1D44E;&#x1D460;&#x1D452; &#x1D436;&#x1D45C;&#x1D45B;&#x1D453;&#x1D456;&#x1D45F;&#x1D45A; &#x1D44C;&#x1D45C;&#x1D462;&#x1D45F; $&#x1D7E3;&#x1D7E2;&#x1D7E2; &#x1D437;&#x1D45C;&#x1D459;&#x1D459;&#x1D44E;&#x1D45F;<br/>&#x1D43A;&#x1D452;&#x1D45B;&#x1D452;&#x1D45F;&#x1D44E;&#x1D459; &#x1D43A;&#x1D456;&#x1D453;&#x1D461; &#x1D436;&#x1D44E;&#x1D45F;&#x1D451; !<br/>*Click Here*<br/>&lt;<a href=\"https://t.co/OL14HCgLEi?amp=1\">https://t.co/OL14HCgLEi?amp=1</a>&gt;</p><p>The advertiser does not manage your subscription.<br/>If you prefer not to receive further communication please unsubscribe here<br/>&lt;<a href=\"https://t.co/yWp8Nx7r4E?amp=1\">https://t.co/yWp8Nx7r4E?amp=1</a>&gt;<br/>Or write to: 11310 E 21st St N ,#518, Wichita, KS, 67206</p>";
let text = "<p>Sent from my iPhone</p><p>Begin forwarded message:</p><p>&gt; From: &quot;<a href=\"http://1ink.com\">1ink.com</a>&quot; &lt;<a href=\"mailto:info@mortgage-assisting.com\">info@mortgage-assisting.com</a>&gt;<br/>&gt; Date: June 16, 2020 at 7:02:26 PM CDT<br/>&gt; To: <a href=\"mailto:sdmckay1@gmail.com\">sdmckay1@gmail.com</a><br/>&gt; Subject: Never Pay Full Price for Printer Ink Again! Save with us Today.<br/>&gt; Reply-To: <a href=\"mailto:info@mortgage-assisting.com\">info@mortgage-assisting.com</a><br/>&gt;<br/>&gt; &#xFEFF;<br/>&gt; ......Your Source for Printer Ink at a Discount!......<br/>&gt;<br/>&gt; Images not loading? Click Here<br/>&gt;<br/>&gt; This is an ad-supported newsletter. You are receiving this because you signed up for our daily newsletter. Click here to unsubscribe<br/>&gt;<br/>&gt;<br/>&gt; App Portal | PO Box 687 PMB 23797 | Salt Lake City, UT 84110 | United States</p>";
let data = { "result": { "results": { "ips": [{ "categoryDescriptions": {}, "cats": {}, "geo": { "country": "United States", "countrycode": "US" }, "ip": "8.8.8.8", "reason": "Regional Internet Registry", "reasonDescription": "One of the five RIRs announced a (new) location mapping of the IP.", "score": 2, "subnets": [{ "asns": { "3356": { "cidr": 8, "removed": true } }, "categoryDescriptions": {}, "cats": {}, "created": "2018-04-24T06:22:00.000Z", "ip": "8.0.0.0", "reason": "Regional Internet Registry", "reasonDescription": "One of the five RIRs announced a (new) location mapping of the IP.", "reason_removed": true, "score": 1, "subnet": "8.0.0.0/8" }, { "asns": { "3356": { "cidr": 9, "removed": true } }, "categoryDescriptions": {}, "cats": {}, "created": "2020-03-22T07:54:00.000Z", "geo": { "country": "United States", "countrycode": "US" }, "ip": "8.0.0.0", "reason": "Regional Internet Registry", "reasonDescription": "One of the five RIRs announced a (new) location mapping of the IP.", "reason_removed": true, "score": 1, "subnet": "8.0.0.0/9" }, { "asns": { "15169": { "cidr": 24, "removed": true } }, "categoryDescriptions": {}, "cats": {}, "created": "2020-03-22T07:54:00.000Z", "ip": "8.8.8.0", "reason": "Regional Internet Registry", "reasonDescription": "One of the five RIRs announced a (new) location mapping of the IP.", "reason_removed": true, "score": 1, "subnet": "8.8.8.0/24" }], "tags": [] }, { "categoryDescriptions": {}, "cats": {}, "geo": { "country": "United States", "countrycode": "US" }, "ip": "9.9.9.9", "reason": "Regional Internet Registry", "reasonDescription": "One of the five RIRs announced a (new) location mapping of the IP.", "score": 1, "subnets": [{ "asns": { "19281": { "cidr": 24, "removed": true } }, "categoryDescriptions": {}, "cats": {}, "created": "2020-03-22T07:54:00.000Z", "geo": { "country": "United States", "countrycode": "US" }, "ip": "9.9.9.0", "reason": "Regional Internet Registry", "reasonDescription": "One of the five RIRs announced a (new) location mapping of the IP.", "reason_removed": true, "score": 1, "subnet": "9.9.9.0/24" }], "tags": [] }], "urls": [{ "result": { "error": "Not Found", "url": "e9nlp.info/UzwFS8IE3X" } }, { "associated": [{ "categoryDescriptions": { "Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components." }, "cats": { "Software / Hardware": true }, "score": 1, "url": "github.com" }], "origUrl": "http://goo.gl/HwUfwd", "result": { "application": { "actionDescriptions": { "Share": "Share a document, share an audio or video stream, upload a file, attach a file to an email", "Write/Post/Chat": "An action that requires the input of plain text (via keyboard or from clipboard). Not included: An upload of a file" }, "actions": { "Share": true, "Write/Post/Chat": true }, "baseurl": "http://github.com/", "canonicalName": "github", "categories": { "Software / Hardware": true }, "categoryDescriptions": { "Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components." }, "description": "A project hosting service ", "id": 727, "name": "GitHub", "riskfactors": { "insecure communication": { "description": "Limited parts of this application are provided over an unencrypted connection", "value": 1 }, "link categorizations": { "description": "Several external references direct to suspicious content", "value": 1 }, "link-to categorizations": { "description": "A low proportion of sites linking to this application are suspicious", "value": 1 }, "malware": { "description": "A significant number of URLs host malware", "value": 100 }, "upload possible": { "description": "The application supports file uploading, which bears a risk of data leakage", "value": 100 } }, "score": 1.4, "urls": ["gist.github.com", "github.com", "github.io", "help.github.com"] }, "categoryDescriptions": { "Software / Hardware": "This category includes Web sites from the area of software, computer hardware and other electronic components." }, "cats": { "Software / Hardware": true }, "score": 1, "url": "https://github.com" }, "tags": [] }] } } };

const url = "vw5.onehabitchanges.com";
const notFoundUrl = "e9nlp.info/UzwFS8IE3X";
// const shortenedUrl = "http://t.co/OL14HCgLEi";
// const shortenedUrl = "http://mz.cm/1gpgLAJ";
// const shortenedUrl = "https://bit.ly/36lGCVR#YXBwL3JlZGlyZWN0aW9uL3dyYXAucGhwP3RyYWNrPUExWEM0NDdYUjJYTTBYUzgwWFYxMThYTjNYTzE0WFc1WFAxWEw5MlhVNDMxNzUxWFQxWA==";
const shortenedUrl = "https://bit.ly/3dyjRAQ";
// const shortenedUrl = "http://goo.gl/HwUfwd";
const ip = "172.224.191.215";
const IoCs = { "domains": ["gmail.com", "vw5.onehabitchanges.com", "https://t.co/OL14HCgLEi", "https://t.co/yWp8Nx7r4E"], "ips": ['1.1.1.1', '8.8.8.8'] };




describe.skip('helpers', function() {

    describe('xfe', function() {


        describe('parseIoCs', () => {
            it('return a success', done => {
                try {
                    XFE.parseIoCs(text)
                        .then((result, err) => {
                            log('Results', JSON.stringify(result));
                            should.not.exist(err);
                            // expect(res).to.not.equal(null);
                            // expect(res).to.have.property('name');
                            // expect(res.name).to.be.a('string');
                            // expect(res.name).to.equal('Demo Customer');

                            done(); // make sure you include this
                        });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('_getURLReputation - standard domain', () => {
            it('return a success', done => {
                try {
                    XFE._getURLReputation(url).then((result, err) => {
                        log('Results', JSON.stringify(result));
                        should.not.exist(err);
                        // expect(res).to.not.equal(null);
                        // expect(res).to.have.property('name');
                        // expect(res.name).to.be.a('string');
                        // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('_getURLReputation - url not found', () => {
            it('return a success', done => {
                try {
                    XFE._getURLReputation(notFoundUrl).then((result, err) => {
                        log('Results', JSON.stringify(result));
                        should.not.exist(err);
                        // expect(res).to.not.equal(null);
                        // expect(res).to.have.property('name');
                        // expect(res.name).to.be.a('string');
                        // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('_getURLReputation - shortened url', () => {
            it('return a success', done => {
                try {
                    XFE._getURLReputation(shortenedUrl).then((result, err) => {
                        log('Results', JSON.stringify(result));
                        should.not.exist(err);
                        // expect(res).to.not.equal(null);
                        // expect(res).to.have.property('name');
                        // expect(res.name).to.be.a('string');
                        // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('_getIPReputation', () => {
            it('return a success', done => {
                try {
                    XFE._getIPReputation(ip).then((result, err) => {
                        log('Results', JSON.stringify(result));
                        should.not.exist(err);
                        // expect(res).to.not.equal(null);
                        // expect(res).to.have.property('name');
                        // expect(res.name).to.be.a('string');
                        // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe('analyze', () => {
            it('return a success', done => {
                try {
                    XFE.analyze(IoCs).then((result, err) => {
                        log('Results', JSON.stringify(result));
                        should.not.exist(err);
                        // expect(res).to.not.equal(null);
                        // expect(res).to.have.property('name');
                        // expect(res.name).to.be.a('string');
                        // expect(res.name).to.equal('Demo Customer');

                        done(); // make sure you include this
                    });
                } catch (err) {
                    log('Caught Error while testing: ', err);
                }
            }).timeout(timeout);
        });

        describe.skip('add metrics', () => {
            it('should return a default string', (done) => {
                XFE.addMetrics(data)
                    .then((result, err) => {
                        data = result;
                        should.not.exist(err);
                        log(JSON.stringify(result));
                        should.not.exist(err);
                        // res.body.should.eql('Hello, stranger!');

                        done();
                    });
            }).timeout(timeout);
        });

    });

});