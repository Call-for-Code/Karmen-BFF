let data = {
    "rows": [{
            "key": [{
                    "analysisType": "email"
                },
                {
                    "class_name": "ham"
                }
            ],
            "value": 1
        },
        {
            "key": [{
                    "analysisType": "email"
                },
                {
                    "class_name": "phishing"
                }
            ],
            "value": 1
        },
        {
            "key": [{
                    "analysisType": "email"
                },
                {
                    "class_name": "spam"
                }
            ],
            "value": 1
        },
        {
            "key": [{
                    "analysisType": "fakenews"
                },
                {
                    "class_name": "reliableham"
                }
            ],
            "value": 1
        },
        {
            "key": [{
                    "analysisType": "fakenews"
                },
                {
                    "class_name": "unreliable"
                }
            ],
            "value": 1
        },
        {
            "key": [{
                    "analysisType": "sms"
                },
                {
                    "class_name": "ham"
                }
            ],
            "value": 1
        },
        {
            "key": [{
                    "analysisType": "sms"
                },
                {
                    "class_name": "spam"
                }
            ],
            "value": 1
        }
    ]
};
let returnObj = {
    "numAnalyzed": 0,
    "media": {
        "sms": 0,
        "email": 0,
        "fakenews": 0
    },
    "classifiers": {
        "email": {
            "spam": 0,
            "ham": 0,
            "phishing": 0
        },
        "sms": {
            "spam": 0,
            "ham": 0
        },
        "fakenews": {
            "unreliable": 0,
            "reliableham": 0
        }
    }
}


for (let obj of data.rows) {
    //increase the number analyzed
    returnObj.numAnalyzed += obj.value;

    //get the values for each object
    let object = Object.assign({}, ...obj.key);
    let arr = Object.values(object);

    //array[0] = classifier, array[1] = media
    returnObj['media'][arr[0]] += obj.value;
    returnObj['classifiers'][arr[0]][arr[1]] += obj.value;

}

console.log(JSON.stringify(returnObj, null, 4));

// console.log(JSON.stringify(data, null, 4));