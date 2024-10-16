const mongoose = require('mongoose')//TODO:replace all mongo code with firebase, setup in typescript

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gradYear: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Member', memberSchemaSchema)