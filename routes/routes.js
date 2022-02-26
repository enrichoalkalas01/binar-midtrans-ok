const Express = require('express')
const Routes = Express.Router()

// Panggil File Controllers
const ProductControllers = require('../controllers/products/productView')
const ProductAPIControllers = require('../controllers/products/product')
const FormControllers = require('../controllers/form/form')
const UserControllers = require('../controllers/users/user')
const ImagesControllers = require('../controllers/images/images')
const ProductSequelize = require('../controllers/products/Sequelize')
// const MidtransControllers = require('../controllers/tester/Midtrans')
const MidtransControllers = require('../controllers/midtrans/Midtrans')

// Login
Routes.get('/login', (req, res) => {
    res.render('login')
})
Routes.get('/api/login', UserControllers.Login)
Routes.post('/login-post', UserControllers.LoginPost)

// Homepages
Routes.get('/', (req, res) => { res.render('tester', { user: 'enricho' })})

Routes.get('/product', ProductControllers.mainProduct)
Routes.get('/product/detail', ProductControllers.detailProduct)
// Routes.get('/product/api/all', ProductControllers.findAll)

// FORM Page
Routes.get('/form', FormControllers.formView)
Routes.post('/form/post', FormControllers.create)

// API Product
Routes.get('/product/api/all', ProductAPIControllers.All)
Routes.get('/product/api/findOne/:id', ProductAPIControllers.FindOne)
Routes.post('/product/api/create', ProductAPIControllers.Create)
Routes.post('/product/api/delete', ProductAPIControllers.Delete)
Routes.get('/product/api/getByUserData', ProductAPIControllers.findByUserData)

Routes.post('/user/api/create', UserControllers.Create)
Routes.post('/api/login', UserControllers.Login)

// Images Processing
Routes.get('/images', (req, res) => {
    res.render('imagespost')
})

Routes.post('/api/images', ImagesControllers.ImagesCreate)
Routes.get('/get/images', ImagesControllers.getImages)

// Search Engine
Routes.get('/api/product/search', ProductAPIControllers.Search)

// Sequelize
Routes.post('/api/sequelize', ProductSequelize.Create)
Routes.get('/api/sequelize', ProductSequelize.Find)
Routes.put('/api/sequelize', ProductSequelize.Update)
Routes.delete('/api/sequelize', ProductSequelize.Delete)

// Midtrans
Routes.post('/api/midtrans', MidtransControllers.CreateTransaction)
Routes.post('/api/midtrans/pay', MidtransControllers.Payment)
Routes.get('/api/midtrans/iris', MidtransControllers.IrisFunction)
Routes.post('/api/midtrans/snap', MidtransControllers.SnapFunction)
Routes.post('/api/midtrans/snap/redirect', MidtransControllers.RedirectSnap)

module.exports = Routes