const express = require("express");
const app = express();
const port = 8888;
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/";
var librixJson = {
    gender: "husdgsdgsdfsdfmor",
    title: "asdasdasdasd me rio mucho",
    style: "asdasdasd"
}

// app.get('/', (req, res) =>
// res.send(url) 
function sacarLibros() {
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

function encontrarLibro(search) {
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

function meterLibro(add) {
    MongoClient.connect(url, function (err, db) {

        var dbo = db.db("librix");
        //if (err) throw err;
        if (err) return false;
        // db.getCollection('libricos').find({});
        dbo.collection("libricos").insertOne(add, function (err, result) {
            console.log("amo a postear")

            //dbo.collection('libricos').find({}, librixJson).toArray(function (err, result) {
            //if (err) throw err;
            if (err) return false;
            console.log("insertado")

            db.close();
        });

    })

    return true;
}
app.post("/", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
    // res.send(req.body)
    var libro = req.body;

    let message;

    if (meterLibro(libro)) {
        message = "ok";
    } else {
        message = "error";
    }

    res.json({
        result: message
    });

    // meterLibro(req);
});
// getAll();
//meterLibro(librixJson);
// get({
//     gender: "policiaco"
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))