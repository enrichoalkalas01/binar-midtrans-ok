const Express = require('express')
const App = Express()
const PORT = 7777
const Morgan = require('morgan')
const Dotenv = require('dotenv')
const Cors = require('cors')
const FileUpload = require('express-fileupload')

// Setting Nodejs Environtment
Dotenv.config({ path: './config/Config.env' })
App.use(FileUpload())
App.use(Cors())
App.set('view engine', 'ejs')
App.use(Express.static('public'))
App.use(Morgan('tiny'))
App.use(Express.urlencoded({ extended: true })) // Type Data Form
App.use(Express.json()) // Type Data JSON

// MongoDB Connection
const ConnectMongoDB = require('./models/mongodb/Connection')
ConnectMongoDB()

// Use Express Endpoint
App.listen(PORT, function() {
    console.log(`Server is running in port : ` + PORT)
})

// Routing
const Routing = require('./routes/routes')
App.use(Routing)

/*

Tugas: Create an application bebas
Includes :
1. Authentication
2. Authorization
3. Must Use API
4. Must Have A Front End ( Must Use JQUERY OR Vanilla JS )
5. Create a database who have an owner ( relation owner )
6. Must have 3 user data

*/