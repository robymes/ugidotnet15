/*eslint no-console: ["error", { allow: ["log"] }] */

"use strict";

var express,
    bodyParser,
    mongoClient,
    mongoUrl,
    db,
    app,
    fs,
    server,
    insertDocument;

try {
    express = require("express");
    bodyParser = require("body-parser");
    mongoClient = require("mongodb").MongoClient;
    app = express();
    mongoUrl = "mongodb://mongo:27017/ugidotnet15";
    console.log(mongoUrl);
    db;
    fs = require("fs");
    mongoClient.connect(mongoUrl, function (err, database) {
        if (!database) {
            throw("MongoDB database is null");
        }
        console.log("Connected correctly to MongoDB server");
        db = database;
    });
    app.use(bodyParser.json());

    insertDocument = function (db, document, callback) {
        var collection = db.collection("users");
        collection.insertOne(document, function (err, result) {
            callback(err, JSON.stringify(result.ops[0]));
        });
    };

    app.post("/addUser", function (req, res) {
        var data = req.body;
        insertDocument(db, data, function (err, result) {
            res.status(201).send(result);
        });
    });

    app.get("/listUsers", function (req, res) {
        fs.readFile( __dirname + "/" + "users.json", "utf8", function (err, data) {
            console.log( data );
            res.end( data );
        });
    });

    server = app.listen(8080, function () {
        var host = server.address().address,
            port = server.address().port;
        console.log("UGIDotNET 15 REST API listening at http://%s:%s", host, port);
    });
} catch (error) {
    console.log("Error: %s", error);
}