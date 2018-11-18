const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const engines = require('consolidate');
const ejs = require('ejs');
const fs = require('fs');

const app = express();

app.get('/timestamp', (req, res) => {
    res.send(`${Date.now()}`)
});

app.get('/timestamp-cached', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    res.send(`${Date.now()}`);
});

app.get('/home', (req, res) => {
    console.log('/home 접속~!!!!')
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');

    fs.readFile('./views/index.ejs', 'utf8', function(error, data) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(ejs.render(data, {cars:[{name:'SM3',price:2000,year:1999,company:'SAMSUNG'},{name:'SM9',price:6000,year:2013,company:'SAMSUNG'}]}));
    });
});

exports.app = functions.https.onRequest(app);
