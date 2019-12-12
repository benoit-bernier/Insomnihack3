const mongoose = require('mongoose');
const wellSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    lat: {
        type: Number,
        required: true,
        unique: false
    },
    long: {
        type: Number,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: false,
        unique: true
    },
    data: [{ type: mongoose.Schema.Types.Mixed }],
    history: {
        type: Object,
        required: false,
        unique: false
    },

});

module.exports = mongoose.model('Well', wellSchema);