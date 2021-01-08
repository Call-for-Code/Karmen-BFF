/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const should = require('should');
const request = require('supertest');
const server = require('../../app');
const debug = require('debug');
const log = debug('debug');

const timeout = 10000; // in milliseconds
// const long_timeout = 30000; // in miliseconds

describe.skip('controllers', () => {
    describe('sms', () => {
        describe('POST /analyzeSMS', () => {
            it('should return a default string', (done) => {
                const text = 'URGENT ALERT: Mike, please review the details for shipment ID: AmazonRewards 2K1K4 here: e9nlp.info/UzwFS8IE3X http://goo.gl/HwUfwd 1.1.1.1 item $110 goodies';

                request(server)
                    .post('/analyzeSMS')
                    .send({ text })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        should.not.exist(err);
                        log(JSON.stringify(res.body));
                        // res.body.should.eql('Hello, stranger!');
                        // data = res.body();
                        done();
                    });
            }).timeout(timeout);
        });
    });
});