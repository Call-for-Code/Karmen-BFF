const should = require('should');
const request = require('supertest');
const server = require('../../app');

const debug = require('debug');
const log = debug('debug');

const timeout = 10000; // in milliseconds
// const long_timeout = 30000; // in miliseconds

describe.skip('controllers', function() {

    describe('whoWeAre', function() {

        describe('GET /whoWeAre', function() {

            it('should return a default string', function(done) {

                request(server)
                    .get('/whoWeAre')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        const debug = require('debug');
                        const log = debug('debug');
                        log(JSON.stringify(res.body));
                        // res.body.should.eql('Hello, stranger!');



                        done();
                    });
            }).timeout(timeout);

        });

    });

});