import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');
const { sendDistributionMetric } = require('datadog-lambda-js');

export const handler = async(event, context, callback) => {

    console.log(event.body);
    var urltocheck = event["queryStringParameters"]['urltocheck'] 
    var fullURL = 'https://api.websitecarbon.com/site?url='+urltocheck;
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: fullURL,
        headers: { }
};
console.log(fullURL)


  sendDistributionMetric(
      'lambda.testing_custom_metric', // Metric name
      12.45,                      // Metric value
      'product:aws-node-test'            // First tag

  );


return axios(config)
.then(function (response) {
  var response = {
        "statusCode": 200,
        "headers": {
            "my_header": "my_value"
        },
        "body": JSON.stringify(response.data.statistics),
        "isBase64Encoded": false
    };

    return response;
    
})
.catch(function (error) {
  console.log(error);
});
};
