const mongoose = require('mongoose');
const _ = require('lodash');
const Joi = require('@hapi/joi');


const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    favoriteAccess: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }


});

function validateMessage(message) {

    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().min(2).max(1024).required().email(),
        phone: Joi.string().pattern(/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/).required(),
        favoriteAccess: Joi.string().min(2).max(400).required(),
        message: Joi.string().min(2).max(2024).required(),

    });
    return schema.validate(message)
}
const Message = mongoose.model('Message', messageSchema);

exports.Message = Message;
exports.validateMessage = validateMessage;
