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

// const axios = require('axios'); //MIT

const cfenv = require('cfenv'); // Apache -2.0

const appEnv = cfenv.getAppEnv();


// Main
// exports.main = IsItSpam;


//the env variable __OW_ACTIVATION_ID is only avail when run as a action in a cloud function
//We are seeing if that env variable exists, and if not, assume we are running locally.
// if (!process.env.__OW_ACTIVATION_ID) {
//     const params = require('./localdev-config.json');
// }



const database = require(`../helpers/database`);



/**
 * Functions in a127 controllers used for operations should take two parameters:
 * @param {*} req a handle to the request object
 * @param {*} res a handle to the response object
 */
function getWhoWeAre(req, res) {
    let url = '';
    let apiKey = '';

    try {
        const Database = new database();
        return Database.getWhoWeAre()
            .then(response => {
                // console.log(response);
                return res.status(200).json(response);
            }).catch(err => {
                throw err;
            })
            // let response = "test";




    } catch (err) {
        console.error(err.stack);
        return res.status(500).json({ message: err.stack });
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
    getWhoWeAre,
};