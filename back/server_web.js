const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const WebSocket = require('ws');
const router = require('./router');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const wss = new WebSocket.Server({ port: 8080 })

let socketTab = [];

wss.on('connection', ws => {
  console.log('Connected');
  socketTab.push(ws);
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.on('error', message => {
    console.log(`Received message => ${message}`)
  })
  ws.on('close', message => {
    console.log("Disconnected");
    socketTab.splice(socketTab.findIndex(function (e) { e == ws }));
  })
})


var dbo;

MongoClient.connect(url).then(function (db) {
  //converted
  dbo = db.db("watersaving");
  exports.dbo=dbo;
  var collectionName = "captorData"
  dbo.createCollection(collectionName).then(function () {
    console.log(collectionName + " collection created!");
    router(app);
  }).catch(function (err) {//failure callback
    console.log(err)
  });
}).catch(function (err) { })




server.listen(3000, function () {
  console.log('server listening on port 3000');
});





io.on('connection', function (client) {
  console.log('Client connected...');

  client.on('join', function (data) {
    console.log(data);
  });
})

exports.app=app;








