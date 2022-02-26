const { MidtransClient } = require('midtrans-node-client')

let ProductData = [
    {
        id: makeid(25),
        name: 'ayam bakar sambal balado',
        quantity: 5,
        price: 25000
    },
    {
        id: makeid(25),
        name: 'ayam bakar balado sambal',
        quantity: 3,
        price: 12500
    }
]

exports.CreateTransaction = (req, res) => {
    const coreApi = new MidtransClient.CoreApi({
        isProduction: false,
        serverKey: process.env.serverKey,
        clientKey: process.env.clientKey
    })

    let amountPrice = 0
    ProductData.map((e) => {
        amountPrice += e.price * e.quantity
    })

    coreApi.charge({
        payment_type: 'bank_transfer',
        bank_transfer: {
            bank: 'bca',
            va_number: '327081087882820337'
        },
        transaction_details: {
            order_id: makeid(25),
            gross_amount: amountPrice
        },
        item_details: ProductData,
        customer_details: {
            first_name: 'admin',
            last_name: 'admin',
            email: 'admin@gmail.com',
            phone: '087820154350',
            billing_address:  {
                address: 'Depok, Yogyakarta',
                city: 'Yogyakarta',
                postal_code: '16436'
            }
        }
    }).then(response => {
        console.log(response)
    }).catch(console.error)

    res.send('ok')
}

exports.Payment = (req, res) => {
    const snapApi = new MidtransClient.Snap({
        isProduction: false,
        serverKey: process.env.serverKey,
        clientKey: process.env.clientKey
    })

    let amountPrice = 0
    ProductData.map((e) => {
        amountPrice += e.price * e.quantity
    })

    snapApi.createTransaction({
        payment_type: 'bank_transfer',
        bank_transfer: {
            bank: 'bca',
            va_number: '327081087882820337'
        },
        transaction_details: {
            order_id: makeid(25),
            gross_amount: amountPrice
        },
        item_details: ProductData,
        customer_details: {
            first_name: 'admin2',
            last_name: 'admin2',
            email: 'admin2@gmail.com',
            phone: '087820154350',
            billing_address:  {
                address: 'Depok, Yogyakarta',
                city: 'Yogyakarta',
                postal_code: '16436'
            }
        }
    })
    .then(response => {
        res.send(response)
    }).catch(err => {
        res.send('err')
    })
}

exports.RedirectSnap = (req, res) => {
    const snapApi = new MidtransClient.Snap({
        isProduction: false,
        serverKey: process.env.serverKey,
        clientKey: process.env.clientKey
    })

    let amountPrice = 0
    ProductData.map((e) => {
        amountPrice += e.price * e.quantity
    })

    snapApi.createTransaction({
        payment_type: 'bank_transfer',
        bank_transfer: {
            bank: 'bca',
            va_number: '327081087882820337'
        },
        transaction_details: {
            order_id: makeid(25),
            gross_amount: amountPrice
        },
        item_details: ProductData,
        customer_details: {
            first_name: 'admin2',
            last_name: 'admin2',
            email: 'admin2@gmail.com',
            phone: '087820154350',
            billing_address:  {
                address: 'Depok, Yogyakarta',
                city: 'Yogyakarta',
                postal_code: '16436'
            }
        }
    })
    .then(response => {
        res.send(response)
    }).catch(err => {
        res.send('err')
    })
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.IrisFunction = (req, res) => {
    const irisApi = new MidtransClient.Iris({
        isProduction: false,
        serverKey: process.env.serverKey,
        clientKey: process.env.clientKey
    })

    // irisApi.ping().then(response => {
    //     console.log(response)
    // }).catch(console.error)

    res.send('ok')
}

exports.SnapFunction = (req,res) => {
    const snapApi = new MidtransClient.Snap({
        isProduction: false,
        serverKey: process.env.serverKey,
        clientKey: process.env.clientKey
    })

    // snapApi.transaction.status('Xd7myAksIB1D3saVoRQM747QX')
    // .then(response => res.send(response))
    // .catch(console.error)

    snapApi.transaction.approve('Bfjk016niuuwJkBVn4MMEKezs')
    .then(response => res.send(response))
    .catch(console.error)

    // res.send("ok")
}

// VA_NUMBER BCA = 32734087882820337