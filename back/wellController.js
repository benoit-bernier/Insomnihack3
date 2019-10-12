let dbo = require("./server_web.js").dbo;

exports.lastData = (req, res) => {

    dbo.collection("captorData").find().toArray(function (err, result) {
        if (err) throw err;
        if (result != null) {
            var tmp = []

            result.forEach(function (e) {
                e.data = e.data[e.data.length - 1]
                console.log(e.data);
                tmp.push(e);
            })
            res.end(JSON.stringify(tmp));
        }
        else {
            res.end();
        }
    });
}

exports.lastDataById = (req, res) => {

    console.log(req.params.id);
    dbo.collection("captorData").findOne({ "id": parseInt(req.params.id) }, function (err, result) {
        if (err) throw err;
        if (result != null) {
            result.data = result.data[result.data.length - 1];
            console.log(result);
            res.end(JSON.stringify(result));
        }
        else {
            res.end();
        }
    });

}

exports.allDataById = (req, res) => {

    console.log(req.params.id);
    dbo.collection("captorData").findOne({ "id": parseInt(req.params.id) }, function (err, result) {
        if (err) throw err;
        if (result != null) {
            console.log(result.data);
            res.end(JSON.stringify(result.data));
        }
        else {
            res.end();
        }
    });
}

exports.allDataName = (req, res) => {
    dbo.collection("captorData").find().toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result != null) {
            let tmp = [];
            result.forEach(function (e) {
                tmp.push({ "id": e.id, "name": e.name });
            })
            res.end(JSON.stringify(tmp));
        }
        else {
            res.end();
        }
    });
}

exports.allDataNameLatLong = (req, res) => {
    dbo.collection("captorData").find().toArray(function (err, result) {
        if (err) throw err;
        if (result != null) {
            let tmp = [];
            result.forEach(function (e) {
                tmp.push({ "id": e.id, "name": e.name, "lat": e.lat, "long": e.long });
            })
            res.end(JSON.stringify(tmp));
        }
        else {
            res.end();
        }
    });
}

exports.create = (req, res) => {

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        console.log(body);
        let json = JSON.parse(body);


        dbo.collection("captorData").findOne({ "id": parseInt(json.id) }, function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result == null) {
                myobj = {
                    id: parseInt(json.id),
                    lat: json.lat,
                    long: json.long,
                    name: json.name,
                    data: []
                }
                dbo.collection("captorData").insertOne(myobj, function (err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.end(JSON.stringify({ status: true }));
                });
            }
            else {
                //ToDO Update
                res.end(JSON.stringify({ status: false }));
            }
        });
    });

}
exports.update = (req, res) => {



    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        console.log(body);
        let json = JSON.parse(body);
        console.log(json);

        dbo.collection("captorData").findOne({ "id": parseInt(json.id) }, function (err, result) {
            if (err) throw err;
            if (result == null) {
                res.end(JSON.stringify({ status: false }));
            }
            else {
                dbo.collection("captorData").updateOne({ "id": parseInt(json.id) }, { $set: json }, function (err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                });
                res.end(JSON.stringify({ status: true }));
            }
        });
    });
}
exports.delete = (req, res) => {

    console.log(req.params.id);
    dbo.collection("captorData").removeOne({ "id": parseInt(req.params.id) }, function (err, result) {
        if (err) {
            throw err;
            res.end(JSON.stringify({ status: false }));
        } else {

            res.end(JSON.stringify({ status: true }));
        }
    });
}



exports.addInfo = (req, res) => {

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {
        console.log(body);
        let json = JSON.parse(body);


        dbo.collection("captorData").findOne({ "id": parseInt(json.id) }, function (err, result) {
            if (err) throw err;
            console.log(result);
            if (result != null) {
                myobj = {
                    nbrHabitant: json.nbrHabitant,
                    nbrChildren: json.nbrChildren,
                    datetime,
                    notes: []
                }
                dbo.collection("captorData").updateOne({ "id": parseInt(json.id) }, { $push: { notes: myobj } }, function (err, result) {
                    if (err) throw err;
                    res.end(JSON.stringify({ status: true }));
                });
            }
            else {
                //ToDO Update
                res.end(JSON.stringify({ status: false }));
            }
        });
    });
}


exports.allInfoNoteById = (req, res) => {
    dbo.collection("captorData").findOne({ "id": parseInt(req.params.id) },function (err, result) {
        if (err) throw err;
        if (result != null) {
   
            res.end(JSON.stringify(result.info));
        }
        else {
            res.end();
        }
    });
};
