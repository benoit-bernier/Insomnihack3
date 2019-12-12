const WellModel = require('../models/well');

exports.lastData = (req, res) => {
    WellModel.find({}, (err, results) => {
        if (err) return console.log(err);
        if (results) {
            results.forEach((elt, index) => {
                results[index].data = elt.data[elt.data.length - 1];
            });
            res.send(results);
        } else {
            res.end();
        }
    });
}

exports.lastDataById = (req, res) => {
    WellModel.findOne({
        "id": req.params.id
    }, (err, results) => {
        if (err) return console.log(err);
        if (results) {
            results.forEach((elt, index) => {
                this[index].data = elt.data[elt.data.length - 1];
            }, results);
            res.send(results);
        } else {
            res.end();
        }
    });
}

exports.allDataById = (req, res) => {
    WellModel.findOne({
        "id": req.params.id
    }, (err, results) => {
        if (err) return console.log(err);
        if (results) {
            results.data = results.data.slice(results.data.length - 10, results.data.length); // juste resturn the last 10 
            res.send(results);
        } else {
            res.end();
        }
    });
}

exports.allDataName = (req, res) => {
    WellModel.find({}, (err, results) => {
        if (err) return console.log(err);
        if (results) {
            results.forEach((elt, index) => {
                this[index] = {
                    "id": elt.id,
                    "name": elt.name
                };
            }, results);
            res.send(results);
        } else {
            res.end();
        }
    });
}

exports.allDataNameLatLong = (req, res) => {
    WellModel.find({}, (err, results) => {
        if (err) return console.log(err);
        if (results) {
            results.forEach((elt, index) => {
                this[index] = {
                    "id": elt.id,
                    "name": elt.name,
                    "lat": elt.lat,
                    "long": elt.long
                };
            }, results);
            res.send(results);
        } else {
            res.end();
        }
    });
}

exports.create = (req, res) => {
    console.log("BODY : " + JSON.stringify(req.body))
    WellModel.findOne({
        "id": parseInt(req.body.id)
    },
        (err, result) => {
            if (err) return res.status(409).send({
                status: false
            });
            if (result) return res.send({
                status: false
            });
            else {
                entry = {
                    id: parseInt(req.body.id),
                    lat: req.body.lat,
                    long: req.body.long,
                    name: req.body.name,
                    data: [],
                    history: {
                        stuff: {
                            software_version: "0.0.1",
                            hardware_version: "0.0.1"
                        },
                        data_person: {
                            adult: 0,
                            child: 0
                        },
                        comment: [],
                        costing: {
                            earthwork: 0,
                            build: 0,
                            transport: 0
                        }
                    }
                };
                WellModel.create(entry, (err, result) => {
                    console.log("ERRE :" + JSON.stringify(err))
                    if (err) return res.status(409).send({
                        status: false
                    });
                    return res.send({
                        status: true
                    });
                })
            }
        });
}

exports.update = (req, res) => {
    WellModel.findOne({
        "id": req.body.id
    },
        (err, result) => {
            if (err) return res.end({
                status: false
            });
            if (result) {
                WellModel.update({
                    "id": req.body.id
                }, req.body, (err, result) => {
                    if (err) return res.status(409).send({
                        status: false
                    });
                    return res.status(202).send({
                        status: true
                    });
                });
            } else {
                res.end(JSON.stringify({
                    status: false
                }));
            }
        });
}

exports.delete = (req, res) => {
    WellModel.deleteOne({ 'id': req.params.id }, (err, result) => {
        if (err) return res.send({ status: false })
        return res.send({ status: true });
    });
}

exports.addInfo = (req, res) => {
    res.end();
}

exports.allInfoNoteById = (req, res) => {
    res.end();
};