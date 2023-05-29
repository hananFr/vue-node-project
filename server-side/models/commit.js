const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const _ = require('lodash');


const commitSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
        minlength: 10
    },
})

const Commit = mongoose.model('Commit', commitSchema);

function validateCommit(commit){
    const schema = Joi.object({
        content: Joi.string().min(10).required(),
    });
    return schema.validate(commit)
}

exports.Commit = Commit;
exports.validateCommit = validateCommit;