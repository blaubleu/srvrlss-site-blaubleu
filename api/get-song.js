/**
 * Route : GET /song/s/{song_id}
 */

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});

const _ = require('underscore');
const util = require('./utils.js')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.SONGS_TBL;

exports.handler = async (event) => {
    try {
        let song_id = decodeURIComponent(event.pathParameters.song_id);

        let params = {
            TableName: tableName,
            IndexName: "song_id-index",
            KeyConditionExpression: "song_id = :song_id",
            ExpressionAttributeValues: {
                ":song_id": song_id
            },
            Limit: 1
        };

        let data = await dynamodb.query(params).promise();
        if(!_.isEmpty(data.Items)) {
            return {
                statusCode: 200,
                headers: util.getResponseHeaders(),
                body: JSON.stringify(data.Items[0])
            }
        } else {
            return {
                statusCode: 404,
                headers: util.getResponseHeaders(),
            }
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