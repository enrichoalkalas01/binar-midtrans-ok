const ProductModel = require('../../models/mongodb/products/product')

exports.All = (req, res) => {
    ProductModel.find().then(response => {
        res.send({
            message: `Successfull to get data`,
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `Failed to get data`,
            statusCode: 500,
        })
    })
}

exports.Create = (req, res) => {

}

exports.FindOne = (req, res) => {

}

exports.UpdateOne = (req, res) => {

}

exports.UpdateMany = (req, res) => {

}

exports.Delete = (req, res) => {

}

// CRUD = Create, Read, Update, Delete
