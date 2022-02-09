const CheckBody = require('../../module/CheckBody')
const JWT = require('jsonwebtoken')
const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SecretKey);
const UserModel = require('../../models/mongodb/user/user');

exports.Create = async (req, res) => {
    if ( !req.body ) {
        res.send(400)
    }

    let DataFind = await UserModel.findOne({ 'username': req.body.username }).then(response => false).catch(err => true)
    if ( DataFind ) {
        res.send({
            message: `Failed to create data`,
            statusCode: 500
        })
    } else {
        const newUserModel = new UserModel({
            username: req.body.username,
            password: cryptr.encrypt(req.body.password),
            fullname: req.body.username,
            email: req.body.username + '@gmail.com'
        })
    
        let CreateData = await newUserModel.save(newUserModel)
        if ( CreateData ) {
            res.send({
                message: `Successfull to create data`,
                statusCode: 200,
            })
        } else {
            res.send({
                message: `Failed to create data`,
                statusCode: 500
            })
        }
    }
}

exports.Login = async (req, res) => {
    console.log(req.body)
    let DataUser = await UserModel.findOne({ 'username': req.body.username }).then(response => response).catch(err => false)
    if ( !DataUser ) {
        res.send({
            message: `Data not found`,
            statusCode: 400
        })
    } else {
        let Password = cryptr.decrypt(DataUser.password)
        if ( Password != req.body.password ) {
            res.send({
                message: `Wrong username or password`,
                statusCode: 400
            })
        } else {
            let CreateToken = JWT.sign(
                { UID: DataUser._id, Username: DataUser.username, Email: DataUser.email },
                process.env.SecretKey,
                { expiresIn: '1h' }
            )

            let DataPassing = {
                Username: DataUser.username,
                Fullname: DataUser.fullname,
                Email: DataUser.email,
                TokenType: 'Bearer',
                Token: CreateToken
            }

            res.send({
                message: `Successfull to login`,
                statusCode: 200,
                results: DataPassing
            })
        }
    }
}

exports.LoginPost = async (req, res) => {
    let DataUser = await UserModel.findOne({ 'username': req.body.username }).then(response => response).catch(err => false)
    if ( !DataUser ) {
        res.send({
            message: `Data not found`,
            statusCode: 400
        })
    } else {
        let Password = cryptr.decrypt(DataUser.password)
        if ( Password != req.body.password ) {
            res.send({
                message: `Wrong username or password`,
                statusCode: 400
            })
        } else {
            let CreateToken = JWT.sign(
                { UID: DataUser._id, Username: DataUser.username, Email: DataUser.email },
                process.env.SecretKey,
                { expiresIn: '1h' }
            )

            let DataPassing = {
                Username: DataUser.username,
                Fullname: DataUser.fullname,
                Email: DataUser.email,
                TokenType: 'Bearer',
                Token: CreateToken
            }

            res.render('login', { LoginData: JSON.stringify(DataPassing) })
        }
    }
}