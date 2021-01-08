# Karmen BFF

## Purpose
This program run the analysis components of Karmen for a given SMS text or Email message.  This includes cleaning the source data, and interfacing trained Watson NLC to identify the confidence percentage of the message being Spam.  It will also identify ip addresses and urls within the message and leverage X-Force Exchange for analysis.  It collects all the data and returns a json.

## Setup
#### Installation
To download and install the required modules, run the command:
> npm i

#### localdev-config.json
If running locally, a sample localdev-config.tpl template has been provided to show the required varialbes for a localdev-config.json file

#### Cloudnat
A dump file containing the databases, views, indexes and initial data created using [couchbackup](https://cloud.ibm.com/docs/Cloudant?topic=Cloudant-ibm-cloudant-backup-and-recovery).

## Test
To run the component tests, run the following command
> LOGGER_LEVEL=debug DEBUG=debug npm run test

## Run Locally
To execute the application locally, execute the following command:
> node index.js

## Login to IBM CLoud
To log into the IBM cloud and setting up the environemnt, execute the following command:
> npm run login

## Push updated code
To push the updated application to the cloud, execute the following commnad:
> npm run build; npm run update

## Watch remote logs during execution
If you need to watch the execution of the application in production, execute the following command:
> npm run logs

## Training NLC
Info on training a NLC and the data formatting can be found at the following links:
* https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/nlc-prepare.html
* https://cloud.ibm.com/docs/natural-language-classifier?topic=natural-language-classifier-using-your-data#using-your-data
