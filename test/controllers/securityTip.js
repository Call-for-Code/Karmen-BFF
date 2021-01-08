const should = require('should');
const request = require('supertest');
const server = require('../../app');
const debug = require('debug');
const log = debug('debug');

const timeout = 10000; // in milliseconds
// const long_timeout = 30000; // in miliseconds

describe.skip('controllers', function() {

    describe('securityTip', function() {

        describe('GET /securityTip', function() {

            it('should return a default string', function(done) {

                request(server)
                    .get('/securityTip')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        log(JSON.stringify(res.body));
                        // res.body.should.eql('Hello, stranger!');



                        done();
                    });
            }).timeout(timeout);

        });

    });

});