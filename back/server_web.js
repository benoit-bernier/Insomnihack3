var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var WebSocket = require('ws')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

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
    socketTab.splice(socketTab.findIndex(function(e){e==ws}));
  })
})


var dbo;

var max_sensor_id;
MongoClient.connect(url).then(function (db) {
  //converted
  dbo = db.db("watersaving");
  var collectionName = "captorData"
  dbo.createCollection(collectionName).then(function() {
      console.log(collectionName+" collection created!");

  }).catch(function (err) {//failure callback
       console.log(err)
  });
}).catch(function (err) {})




server.listen(3000,function(){
  console.log('server listening on port 3000');
});

app.get('/dataById/:id', function (req, res) {
  console.log(req.params.id);
  dbo.collection("captorData").findOne({"id":parseInt(req.params.id)},function(err, result){
    if (err) throw err;
    if(result!=null){
    console.log(result.data);
    res.end(JSON.stringify(result.data));
    }
    else{
      res.end();
    }
  });
})



app.get('/dataLast/:id', function (req, res) {
  console.log(req.params.id);
  dbo.collection("captorData").findOne({"id":parseInt(req.params.id)},function(err, result){
    if (err) throw err;
    if(result!=null){
      result.data=result.data[result.data.length-1];
      console.log(result);
      res.end(JSON.stringify(result));
    }
    else{
      res.end();
    }
  });
})

app.get('/dataLast', function (req, res) {
  dbo.collection("captorData").find().toArray(function(err, result){
    if (err) throw err;
    if(result!=null){
      var tmp=[]
      
      result.forEach(function(e){
        e.data=e.data[e.data.length-1]
        console.log(e.data);
        tmp.push(e);
      })
      res.end(JSON.stringify(tmp));
    }
    else{
      res.end();
    }
  });
})

app.post('/weel', function (req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    console.log(body);
    let json = JSON.parse(body);


    dbo.collection("captorData").findOne({"id":parseInt(json.id)}, function(err, result) {
      if (err) throw err;
      console.log(result);
      if(result==null){
        myobj = {
          id:parseInt(json.id),
          lat: json.lat,
          long:json.long,
          name:json.name,
          data:[]
        }
        dbo.collection("captorData").insertOne(myobj, function(err, result) {
          if (err) throw err;
          console.log("1 document inserted");
          res.end(JSON.stringify({status:true}));
        });
      }
      else{
        //ToDO Update
        res.end(JSON.stringify({status :false}));
      }
    });
  });
})

app.put('/weel', function (req, res) {

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    console.log(body);
    let json = JSON.parse(body);
    console.log(json);

    dbo.collection("captorData").findOne({"id":parseInt(json.id)}, function(err, result) {
      if (err) throw err;
      if(result==null){
          res.end(JSON.stringify({status:false}));
      }
      else{
        dbo.collection("captorData").updateOne({"id":parseInt(json.id)},{ $set: json }, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
        });
        res.end(JSON.stringify({status :true}));
      }
    });
  });

})

app.delete('/weel/:id', function (req, res) {
  console.log(req.params.id);
  dbo.collection("captorData").removeOne({"id":parseInt(req.params.id)},function(err, result){
    if (err) {
      throw err;
      res.end(JSON.stringify({status :false}));
    }else{
      
      res.end(JSON.stringify({status:true}));
    }
  });
})


app.post('/data', function (req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    console.log(body);
    let json = JSON.parse(body);
    //ADD DATA TO MONGODB
    var myobj = json;
    console.log(json);
    dbo.collection("captorData").findOne({"id":parseInt(json.sensor_id)}, function(err, res) {
      if (err) throw err;
      console.log(res);
      if(res==null){
        myobj = {
          id:parseInt(json.sensor_id),
          lat: (Math.random() * (+30.0 - +15.0) + +15.0),
          long:(Math.random() * (+15.0 - +3.0) + +3.0),
          name:'unknow',
          data:[json]
        }
        dbo.collection("captorData").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        });
      }
      else{
        //ToDO Update
        res.data.push(json);
        console.log(res);
        dbo.collection("captorData").update({"id":parseInt(json.sensor_id)},{ $push: { data: json } }, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
        });
      }
    });


    //SEND DATA TO WS
    socketTab.forEach(function(ws){
      ws.send(body);
    })
    res.end();
  });
})

io.on('connection', function(client) {
  console.log('Client connected...');

  client.on('join', function(data) {
      console.log(data);
  });
})








