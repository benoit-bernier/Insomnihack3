const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const WebSocket = require('ws');
const router = require('./router');
var socketTab = require('./shared-sockets');

app.use(bodyParser.json()); // parse application/json
app.use(cors());
app.use(express.static('static'));

var db = require('./config/config');
console.log('dburl : '+db.url)
mongoose.connect(db.url,{ useNewUrlParser: true }); 

mongoose.connection.on('connected', () => {
   console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
   console.log('MongoDB connection error : ' + err);
});

mongoose.connection.on('disconnected', () => {
   console.log('MongoDB connection close')
});

const wss = new WebSocket.Server({ port: process.env.SERVER_PORT })

router(app);

wss.on('connection', ws => {
  console.log('Connected');
  socketTab.push(ws);
  exports.socketTab=socketTab;
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.on('error', message => {
    console.log(`Received message => ${message}`)
  })
  ws.on('close', message => {
    console.log("Disconnected");
    socketTab.splice(socketTab.findIndex(function (e) { e == ws }));
    exports.socketTab=socketTab;
  })
})

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
exports.socketTab=socketTab;








