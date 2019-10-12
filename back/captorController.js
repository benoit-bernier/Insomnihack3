let dbo= require("./server_web.js").dbo;
let socketTab = require("./server_web.js").socketTab;

exports.receiveData = (req, res) => {

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        //console.log(body);
        let json = JSON.parse(body);
        //ADD DATA TO MONGODB
        var myobj = json;
        //console.log(json);
        dbo.collection("captorData").findOne({ "id": parseInt(json.sensor_id) }, function (err, res) {
            let name='unknow';
            if (err) throw err;
            //console.log(res);
            if (res == null) {
                myobj = {
                    id: parseInt(json.sensor_id),
                    lat: (Math.random() * (+30.0 - +15.0) + +15.0),
                    long: (Math.random() * (+15.0 - +3.0) + +3.0),
                    name: 'unknow',
                    data: [json]
                }
                //console.log(myobj);
                dbo.collection("captorData").insertOne(myobj, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                });
            }
            else {
                //ToDO Update
                name=res.name;
                res.data.push(json);
                //console.log(res);
                dbo.collection("captorData").update({ "id": parseInt(json.sensor_id) }, { $push: { data: json } }, function (err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");

                });
            }
            //Check if alert
            let jsonLimit ={"quantity" : 50, "quality" : 5, "humidity" : 70, "temp" : 40, "irradiance" : 1000 };
            let alert =[];
            if(parseInt(json.quantity)<parseInt(jsonLimit.quantity)){
                alert.push("quantity");
            }
            if(parseInt(json.quality)>parseInt(jsonLimit.quality)){
                alert.push("quality");
            }
            if(parseInt(json.humidity)>parseInt(jsonLimit.humidity)){
                alert.push("humidity");
            }
            if(parseInt(json.temp)>parseInt(jsonLimit.temp)){
                alert.push("temp");
            }
            if(parseInt(json.irradiance)>parseInt(jsonLimit.irradiance)){
                alert.push("irradiance");
            }
            console.log(alert);
            if(alert.length>0){
                let jsonAlert={
                    "datetime":json.datetime,
                    "alert":alert,
                    "name":name,
                    "data":json
                };
                console.log(jsonAlert);
                socketTab.forEach(function (ws) {
                    ws.send(JSON.stringify(jsonAlert));
               })
            }
        });
       
        res.end();
    });
}
