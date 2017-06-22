/// <reference path="../vendor/node.d.ts" />

import http = require("http");
import url = require("url");
import mongo = require("mongodb");
import assert = require("assert");

console.log("Server startup ...");

let server: http.Server = http.createServer();
server.addListener("listening", onListen);
server.addListener("request", onRequest);

console.log("Connecting to database ...");
mongo.MongoClient.connect("mongodb://localhost:27017/eia2ss17", onConnect);
let database: mongo.Db;




function onConnect(_error: mongo.MongoError, _database: mongo.Db): void {
    assert.ifError(_error);

    database = _database;
    server.listen(process.env.port || 8100);
}

function onListen(): void {
    console.log("Hello, I'm your server today. \nI'm listening on port " + process.env.port)
}

function onRequest(_request: http.IncomingMessage, _response: http.ServerResponse): void {
    console.log("Request received");

    let data: MyData = {
        number: parseInt(url.parse(_request.url, true).query["number"]),
        selection: url.parse(_request.url, true).query["selection"]
    };

    database.collection("Dominik").insertOne(data, onInsert);

}

function onInsert(_error: mongo.MongoError, _result: mongo.InsertOneWriteOpResult) {
    assert.ifError(_error);
    if (_result.result.ok == 1)
        console.log("Successfully inserted");
    let cursor: mongo.Cursor<any> = database.collection("Dominik").find()
    cursor.toArray(function (_error: mongo.MongoError, _data: any[]) {
        console.log(_data)
    });
}

interface MyData {
    number: number;
    selection: string;
}
