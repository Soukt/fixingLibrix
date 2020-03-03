const express = require("express");
const app = express();
const port = 8888;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var librixJson = {
    gender: "humor",
    title: "shhhhhh me rio mucho",
    style: "realista"
}

// app.get('/', (req, res) =>
// res.send(url) 
function getAll() {
    MongoClient.connect(url, function (err, db) {

        var dbo = db.db("librix");
        if (err) throw err;

        // db.getCollection('libricos').find({});
        dbo.collection("libricos").find({}).toArray(function (err, result) {

            //dbo.collection('libricos').find({}, librixJson).toArray(function (err, result) {
            if (err) throw err;
            console.log("Aqui esta toda la DB")
            console.log(result)
            db.close();
        });

    })
}

function get(search) {
    MongoClient.connect(url, function (err, db) {


        var dbo = db.db("librix");
        if (err) throw err;

        // db.getCollection('libricos').find({});
        dbo.collection("libricos").find(search).toArray(function (err, result) {

            //dbo.collection('libricos').find({}, librixJson).toArray(function (err, result) {
            if (err) throw err;
            console.log("Aqui estan los resultados del find gender policiaco")
            console.log(result)
            db.close();
        });

    })
}

function post(add) {
    MongoClient.connect(url, function (err, db) {

        var dbo = db.db("librix");
        if (err) throw err;
        // db.getCollection('libricos').find({});
        dbo.collection("libricos").insertOne(add, function (err, result) {
            console.log("amo a postear")

            //dbo.collection('libricos').find({}, librixJson).toArray(function (err, result) {
            if (err) throw err;
            console.log("insertado")

            db.close();
        });

    })
}

post(librixJson);
getAll();

get({
    gender: "policiaco"
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))