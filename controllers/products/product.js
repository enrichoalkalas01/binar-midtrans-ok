const ProductModel = require('../../models/mongodb/products/product')
const JWT = require('jsonwebtoken')
const JWTModule = require('../../module/JWTCheck')
const UserModel = require('../../models/mongodb/user/user')

exports.All = async (req, res) => {
    let Token = await JWTModule.JWTVerify(req.headers)
    if ( !Token ) {
        res.send(403)
    } else {
        await ProductModel.find().then( response => {
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
}

exports.Create = async (req, res) => {
    let Token = await JWTModule.JWTVerify(req.headers)
    if ( !Token ) {
        res.send(403)
    } else {
        // Create / Insert New Schema DB
        const newProduct = new ProductModel({
            UID: Token.UID,
            UserOwner: Token.Username,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        })

        newProduct.save(newProduct).then(response => {
            res.send({
                message: `Successfull to create data`,
                statusCode: 200,
                results: response
            })
        }).catch(err => {
            res.send({
                message: `Failed to create data`,
                statusCode: 500
            })
        })
    }
}

exports.FindOne = async (req, res) => {
    let Token = await JWTModule.JWTVerify(req.headers)
    if ( !Token ) {
        res.send(403)
    } else {
        ProductModel.findOne({ "_id": req.params.id, "UserOwner": ResultToken.Username }).then(response => {
            res.send({
                message: `Successfull to create data`,
                statusCode: 200,
                results: response
            })
        }).catch(err => {
            res.send({
                message: `Failed to create data`,
                statusCode: 500,
            })
        })
    }
    
}

exports.UpdateOne = (req, res) => {

}

exports.Delete = (req, res) => {
    if ( !req.body ) {
        res.send({
            message: `Failed to delete data`,
            statusCode: 400
        })
    } else {
        ProductModel.deleteOne({ "_id": req.body.id }).then(response => {
            res.send({
                message: `Successfull to delete data`,
                statusCode: 200
            })
        }).catch(err => {
            res.send({
                message: `Failed to delete data`,
                statusCode: 500
            })
        })
    }
}

// CRUD = Create, Read, Update, Delete
// Username, Password, Fullname, Email, Age, Description

exports.findByUserData = async (req, res) => {
    let Token = await JWTModule.JWTVerify(req.headers)
    if (!Token) res.send({ message: `failed to get data, dont have access`, statusCode: 403 })

    let DataGet = await UserModel.aggregate([
        {
            $match: { 'username': Token.Username }
        },
        {
            $lookup: {
                from: 'products',
                localField: 'username',
                foreignField: 'UserOwner',
                as: 'data_products'
            }
        }
    ]).then(response => response).catch(err => false)

    if ( !DataGet ) res.sendStatus(500)
    else res.send({ message: `successfull to get data`, statusCode: 200, results: DataGet })
}

exports.Search = async (req, res) => {
    console.log(req.query.search)
    await ProductModel.find({ "title": { $regex: req.query.search + '.*' } }).then(response => {
        res.send({
            message: 'successfull to search data',
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `failed to search data`,
            statusCode: 500,
        })
    })
}


// Get Data User -> Get Data Products By Username -> Data Passing ( Grouping By Data User & Data Products )