const express = require("express");
const app = express();
const port = 8888;
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/";

// var librixJson = {
//     gender: "husdgsdgsdfsdfmor",
//     title: "asdasdasdasd me rio mucho",
//     style: "asdasdasd"
// }

function sacarLibros(res) {


    MongoClient.connect(url, function (err, db) {

        var dbo = db.db("librix");
        if (err) throw err;

        // db.getCollection('libricos').find({});
        dbo.collection("libricos").find({}).toArray(function (err, result) {
            console.log("hola")

            //dbo.collection('libricos').find({}, librixJson).toArray(function (err, result) {
            if (err) throw err;
            console.log("Aqui esta toda la DB")
            // console.log(result)

            db.close();

            res.send(result);

            // this.setState(result)
        });
    });
}

function encontrarLibro(search) {
    MongoClient.connect(url, function (err, db) {


        var dbo = db.db("librix");
        if (err) throw err;

        dbo.collection("libricos").find(search).toArray(function (err, result) {

            if (err) throw err;
            console.log("Aqui estan los resultados del find genre policiaco")
            console.log(result)
            db.close();
        });

    })
}

function meterLibro(add) {
    MongoClient.connect(url, function (err, db) {

        var dbo = db.db("librix");
        if (err) return false;
        dbo.collection("libricos").insertOne(add, function (err, result) {
            console.log("amo a postear")

            if (err) return false;
            console.log("insertado")

            db.close();
        });

    })

    return true;
}
app.get("/getbooks", async function (req, res) {
    sacarLibros(res);
})
app.post("/addbooks", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body)
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

});
// sacarLibros();
app.listen(port, () => console.log(`Example app listening on port ${port}!`))