
const express = require('express');

module.exports = (app) => {

    const well = require("./wellController");
    const captor = require("./captorController");

    app.get("/well/data/last", well.lastData);
    app.get("/well/data/last/:id", well.lastDataById);
    app.get("/well/data/all/:id", well.allDataById);

    app.post("/well/create", well.create);
    app.put("/well/update", well.update);
    app.delete("/well/delete/:id", well.delete);

    app.post("/captor/data", captor.receiveData);
}
