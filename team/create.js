'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  'use strict';
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.TEAM_TABLE,
    Item: {
      id: data.id,
      country: data.country,
      gender: data.gender,
      name: data.name,
      organizationName: data.organizationName,
      region: data.region,
      sport: data.sport,
      timeZone: data.timeZone,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  dynamoDb.put(params, (error) => {
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the team.',
      });
      return;
    }
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
