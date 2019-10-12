let dbo= require("./server_web.js").dbo;

exports.receiveData = (req, res) => {

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
        dbo.collection("captorData").findOne({ "id": parseInt(json.sensor_id) }, function (err, res) {
            if (err) throw err;
            console.log(res);
            if (res == null) {
                myobj = {
                    id: parseInt(json.sensor_id),
                    lat: (Math.random() * (+30.0 - +15.0) + +15.0),
                    long: (Math.random() * (+15.0 - +3.0) + +3.0),
                    name: 'unknow',
                    data: [json]
                }
                dbo.collection("captorData").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                });
            }
            else {
                //ToDO Update
                res.data.push(json);
                console.log(res);
                dbo.collection("captorData").update({ "id": parseInt(json.sensor_id) }, { $push: { data: json } }, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                });
            }
        });


        //SEND DATA TO WS
        socketTab.forEach(function (ws) {
            ws.send(body);
        })
        res.end();
    });
}