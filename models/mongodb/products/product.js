const Mongoose = require('mongoose')

var Schema = new Mongoose.Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    UID: { type: String },
    UserOwner: { type: String },
})

const Product = Mongoose.model('product', Schema)

module.exports = Product
