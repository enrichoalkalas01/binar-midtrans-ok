const { product } = require('../../models')

exports.Create = (req, res) => {
    product.create({
        title: req.body ? req.body.title ? req.body.title : '' : '',
        excerpt: req.body ? req.body.title ? req.body.title : '' : '',
        price: req.body ? req.body.title ? req.body.title : '' : '',
        description: req.body ? req.body.title ? req.body.title : '' : ''
    }).then(response => {
        res.send(response)
    }).catch(err => {
        console.log(err)
    })
}

exports.Find = (req, res) => {
    product.findAll().then(response => {
        res.send(response)
    }).catch(err => {
        res.sendStatus(500)
    })
}

exports.Update = (req, res) => {
    product.update(
        req.body,
        { where: { id: 1 } }
    ).then(response => {
        res.send(response)
    }).catch(err => {
        console.log(err)
    })
}

exports.Delete = (req, res) => {
    product.destroy({
        where: { id: 1 }
    }).then(response => {
        res.send(`success to delete data`)
    }).catch(err => {
        res.send(`failed to delete data`)
    })
}