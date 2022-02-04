const Axios = require('axios')

let dataProduct = []
for( let i = 0; i < 10; i++ ) {
    dataProduct[i] = {
        title: `Product title ${ i }`,
        price: 10000 + ( i * 1000 ),
        image: "/background Binar.jpg"
    }
}

const mainProduct = (req, res) => {
    res.render('product/product', { data: dataProduct })
}

const detailProduct = (req, res) => { 
    let dataObject = {
        message: `successfull to get data`,
        statusCode: 200,
        result: [
            { name: 'chondro' },
            { name: 'sima' },
            { name: 'joshua' },
            { name: 'ihza' }
        ]
    }

    res.send(dataObject)
}

exports.findAll = (req, res) => {
    res.send({
        message: 'successfull to get data',
        statusCode: 200,
        results : dataProduct
    })
}

exports.mainProduct = mainProduct
exports.detailProduct = detailProduct