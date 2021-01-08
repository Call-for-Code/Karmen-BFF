var should = require('should');
var request = require('supertest');
var server = require('../../app');

const timeout = 10000; // in milliseconds
const long_timeout = 30000; // in miliseconds

describe.skip('controllers', function() {

    describe('fakeNews', function() {
        describe('POST /analyzeFakeNews', function() {
            it('should return a default string', function(done) {
                let text = "title: Specter of Trump Loosens Tongues, if Not Purse Strings, in Silicon Valley - The New York Times, author: David Streitfeld, body: PALO ALTO, Calif.  —   After years of scorning the political process, Silicon Valley has leapt into the fray. The prospect of a President Donald J. Trump is pushing the tech community to move beyond its traditional role as donors and to embrace a new existence as agitators and activists. A distinguished venture capital firm emblazoned on its corporate home page an earthy   epithet. One prominent tech chieftain says the consequences of Mr. Trump’s election would range between disastrous and terrible. www.ibm.com 8.8.8.8";

                request(server)
                    .post('/analyzeFakeNews')
                    .send({ text: text })
                    .set('Accept', 'application/json')
                    // .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        console.log(JSON.stringify(res.body));
                        // res.body.should.eql('Hello, stranger!');

                        done();
                    });
            }).timeout(timeout);

        });

    });

    describe('fakeNew URL', function() {
        describe('POST /analyzeFakeNewsURL', function() {
            it('should return a default string', function(done) {

                let url = "https://www.cnn.com/2020/05/25/health/hydroxychloroquine-study-halt/index.html";

                request(server)
                    .post('/analyzeFakeNewsURL')
                    .send({ url: url })
                    .set('Accept', 'application/json')
                    // .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        console.log(JSON.stringify(res.body));
                        // res.body.should.eql('Hello, stranger!');

                        done();
                    });
            }).timeout(long_timeout);

        });

    });
});