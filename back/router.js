
const express = require('express');

module.exports = (app,auth) => {

    const well = require("./controllers/wellController");
    const sensor = require("./controllers/sensorController");

    app.get("/well/data/last",auth.isAuth, well.lastData);
    app.get("/well/data/last/:id",auth.isAuth, well.lastDataById);
    app.get("/well/data/all/:id",auth.isAuth, well.allDataById);
    app.get("/well/data/name/all",auth.isAuth, well.allDataName);
    app.get("/well/data/nameLatLong/all",auth.isAuth, well.allDataNameLatLong);

    app.post("/well/info/add",auth.isAuth, well.addInfo);

    app.get("/well/info/all/:id",auth.isAuth, well.allInfoNoteById);

    app.post("/well/create",auth.isAuth, well.create);
    app.put("/well/update",auth.isAuth, well.update);
    app.delete("/well/delete/:id",auth.isAuth, well.delete);

    app.post("/sensor/data", sensor.receiveData);

    //AUTH
    app.post('/api/login', auth.login);
    app.get('/api/logout', auth.logout);
}
