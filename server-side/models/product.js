const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const _ = require('lodash');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    desc:{
        type: String,
        minlength: 10,
        maxlength: 5000,
        required:true
    },
    category:{
        type: String,
        required: true
    },
    image: {
        type:String,
        required:true
    }
})

const Product = mongoose.model('Product', productSchema)

const productValidate = (product) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required(),
        desc: Joi.string().min(10).max(5000).required(),
        category: Joi.string().required(),
        image: Joi.string().required()
    })
    return schema.validate(product)
}

exports.Product = Product;
exports.productValidate = productValidate;