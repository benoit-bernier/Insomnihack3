
const express = require('express');

module.exports = (app) => {

    const well = require("./controllers/wellController");
    const sensor = require("./controllers/sensorController");

    app.get("/well/data/last", well.lastData);
    app.get("/well/data/last/:id", well.lastDataById);
    app.get("/well/data/all/:id", well.allDataById);
    app.get("/well/data/name/all", well.allDataName);
    app.get("/well/data/nameLatLong/all", well.allDataNameLatLong);

    app.post("/well/info/add", well.addInfo);

    app.get("/well/info/all/:id", well.allInfoNoteById);

    app.post("/well/create", well.create);
    app.put("/well/update", well.update);
    app.delete("/well/delete/:id", well.delete);

    app.post("/captor/data", sensor.receiveData);
}
