
const WellModel = require('../models/well');
let timers=[]; 

var socketTab = require('../shared-sockets');

exports.receiveData = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        let json = JSON.parse(body);
        let myobj = json;
        console.log(json)
        WellModel.findOne({"id":  parseInt(json.sensor_id)}, (err, result) => {
            let name='unknow';
            if (result == null) {
                myobj = {
                    id: parseInt(json.sensor_id),
                    lat: (Math.random() * (+30.0 - +15.0) + +15.0),
                    long: (Math.random() * (+15.0 - +3.0) + +3.0),
                    name: 'unknow',
                    data: [json]
                }
                WellModel.create(myobj, (err, result) => {
                    if (err) console.log("error while adding new entry on receiveData")
                    console.log("1 document inserted with create");
                })
            }
            else {
                name=result.name;
                result.data.push(json);

                WellModel.update({"id": parseInt(json.sensor_id)}, { $push: { data: json } }, function (err, res) {
                    if (err) console.log(err);
                    if( timers[json.sensor_id]!=null){
                        clearTimeout(timers[json.sensor_id]);
                    }
                   timers[json.sensor_id]=setTimeout(function() {
                    let jsonAlert={

                        "alert":['nodata'],
                        "name":result.name,
                        "lat":result.lat,
                        "long":result.long,
                        "datetime":result.data[result.data.length-1].datetime,
                        "level":3

                    };
                    socketTab.forEach(function (ws) {
                        ws.send(JSON.stringify(jsonAlert));
                   })
                    }, 40000, result);

                    console.log("1 document inserted with update");
                });
            }

            //Check if alert
            let jsonLimit ={"quantity" : 50, "quality" : 5, "humidity" : 70, "temp" : 40, "irradiance" : 1000 };
            let alert =[];
            let level=0;
            if(parseInt(json.quantity)<parseInt(jsonLimit.quantity)){
                alert.push("quantity");
                if(level<3){level=3;}
            }
            if(parseInt(json.quality)==1){
                alert.push("quality");
                if(level<3){level=3;}
            }
            if(parseInt(json.humidity)>parseInt(jsonLimit.humidity)){
                alert.push("humidity");
                if(level<2){level=2;}
            }
            if(parseInt(json.temp)>parseInt(jsonLimit.temp)){
                alert.push("temp");
                if(level<1){level=1;}
            }
            if(parseInt(json.irradiance)>parseInt(jsonLimit.irradiance)){
                alert.push("irradiance");
                if(level<1){level=1;}
            }
            if(alert.length>0){
                let jsonAlert={
                    "datetime":json.datetime,
                    "alert":alert,
                    "name":name,
                    "level":level,
                    "data":json
                };
                socketTab.forEach(function (ws) {
                    ws.send(JSON.stringify(jsonAlert));
               })
            }
        });
        res.end();
    });
}
