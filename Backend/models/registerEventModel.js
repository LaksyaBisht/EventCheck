const mongoose = require('mongoose');

const registerEventSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true,
        maxlength: 255
    },
    name: {
        type: String, 
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    },
    registrationNum: {
        type: String,
        required: true,
        maxlength: 255
    },
    phone: {
        type:String, 
        required: true,
        maxlength: 255
    },
    teamDetails: {
        type: String, 
        required: true,
        maxlength: 255
    },
    register_at: { 
        type: Date, 
        default: Date.now 
    }
})

const registerEvents = mongoose.model('registerEvents', registerEventSchema);
module.exports = registerEvents;
