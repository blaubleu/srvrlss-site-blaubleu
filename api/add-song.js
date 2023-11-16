/**
 * Route : CREATE /song/s/{song_id}
 */

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2'});

const uuidv4 = require('uuid/v4')
const util = require('./utils.js')

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.SONGS_TBL;

exports.handler = async (event) => {
    try {

        let item = JSON.parse(event.body).Item;
        item.user_name = util.getUserName(event.headers);
        item.song_id = item.user_name + ':' + uuidv4();

        let data = await dynamodb.put({
            TableName: tableName,
            Item: item
        }).promise();

        return {
            statusCode: 200,
            headers: util.getResponseHeaders(),
            body: JSON.stringify(item)
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