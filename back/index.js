const express = require('express');
const app = express();
const serverPort = process.env.SERVER_PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const wsAuth = require('./middlewares/wsAuth');
const server = require('http').createServer(app);
const auth = require('./middlewares/auth');

const WebSocket = require('ws');
const router = require('./router');
var socketTab = require('./shared-sockets');

app.use(bodyParser.json()); // parse application/json
app.use(cors());
app.use(express.static('static'));

router(app, auth);

var db = require('./config/config');
console.log('dburl : ' + db.url)
mongoose.connect(db.url, {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error : ' + err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection close')
});

const wss = new WebSocket.Server({
  port: 3001
})

wss.on('connection', ws => {
  console.log('Connected');
  // timer of auth, client has to send the auth message within 5 seconds
  let auth_timeout = setTimeout(function () {
    console.log("timeout lancé")
    ws.close();
  }, 5000);
  ws.on('message', message => {
    try {
      message = JSON.parse(message)
    } catch (e) {
      ws.close();
    }
    if (message.token != null) {
      clearTimeout(auth_timeout);
      wsAuth.authenticate(message.token, (err, result, option) => {
        if (err) ws.close();
        else {
          ws.emit("authenticated")
          socketTab.push(ws);
          exports.socketTab = socketTab;
        }
      })
    }
  })
  ws.on('error', message => {
    console.log(`Received message => ${message}`)
  })
  ws.on('close', message => {
    console.log("Disconnected");
    socketTab.splice(socketTab.findIndex(function (e) {
      e == ws
    }));
    exports.socketTab = socketTab;
  })
})

server.listen(3000, function () {
  console.log('server listening on port 3000');
});

exports.app = app;
exports.socketTab = socketTab;