/*eslint no-console: ["error", { allow: ["log"] }] */

"use strict";

var express,
    bodyParser,
    mongoDb,
    mongoClient,
    mongoUrl,
    uuid,
    instanceUuid,    
    db,
    app,
    server,
    checkUserCollection,
    createResult;

try {
    uuid = require("uuid");
    instanceUuid = uuid.v4();
    express = require("express");
    bodyParser = require("body-parser");
    mongoDb = require("mongodb");
    mongoClient = mongoDb.MongoClient;
    app = express();
    mongoUrl = "mongodb://mongo:27017/ugidotnet15";
    console.log(mongoUrl);
    db;
    mongoClient.connect(mongoUrl, function (err, database) {
        if (!database) {
            throw("MongoDB database is null");
        }
        console.log("Connected correctly to MongoDB server");
        db = database;
    });
    app.use(bodyParser.json());

    createResult = function (res) {
        return {
            instanceId: instanceUuid,
            result: res
        };
    };

    checkUserCollection = function () {
        db.createCollection("users", function (err, collection) {
            return;
        });
    };

    app.post("/addUser", function (req, res) {
        var collection;
        checkUserCollection();
        collection = db.collection("users");
        collection.insertOne(req.body, {
            w: 1
        }, function (err, result) {
            res.status(201).send(createResult(result));
        });
    });

    app.post("/deleteUser", function (req, res) {
        var collection;
        checkUserCollection();
        collection = db.collection("users");
        collection.remove({
            _id: new mongoDb.ObjectID(req.body.id)
        }, {
            w: 1
        }, function (err, result) {
            res.status(201).send(createResult(result));
        });
    });

    app.get("/listUsers", function (req, res) {
        var collection;
        checkUserCollection();
        collection = db.collection("users");
        collection.find().toArray(function (err, items) {
            res.status(201).send(createResult(items));
        });
    });

    server = app.listen(80, function () {
        var host = server.address().address,
            port = server.address().port;
        console.log("UGIDotNET 15 REST API listening at http://%s:%s", host, port);
    });
} catch (error) {
    console.log("Error: %s", error);
}