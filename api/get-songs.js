/**
 * Route : GET /songs
 */

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});

const moment = require('moment');
const util = require('./utils.js')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.SONGS_TBL;

exports.handler = async (event) => {
    try {

        let query = event.queryStringParameters;
        let limit = query && query.limit ? parseInt(query.limit) : 4
        let songId = util.getsongId(event.headers);

        let params = {
            TableName: tableName,
            KeyConditionExpression: "song_id = :uid",
            ExpressionAttributeValues: {
                ":uid": song_id
            },
            Limit: limit,
            ScanIndexForward: false
        };

        let startTimestamp = query && query.start ? parseInt(query.start) : 0;

        if(startTimestamp > 0) {
            params.ExclusiveStartKey = {
                song_id: song_id,
                timestamp: startTimestamp
            }
        }

        let data = await dynamodb.query(params).promise()

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(data)
        }
    } catch (err) {
        console.log('Err: ', err);
        return {
            statusCode: err.statusCode ? err.statusCode : 500,
            headers: util.getResponseHeaders(),
            body: JSON.stringify({
                error: err.name ? err.name : "Exception",
                message: err.message ? err.message : "Unkown error"
            })
        };
    }
}