const Http = require('http')
const fs = require('fs')

let dataJson = {
    name: "enricho alkalas",
    kelas: 10
}

// const onRequest = (request, response) => {
//     response.writeHead(200, { "Content-Type": 'text/html' })
//     fs.readFile('./index.html', null, (err, data) => {
//         if (err) {
//             response.writeHead(400)
//             response.write('file not found')
//         } else {
//             response.write(data)
//         }

//         response.end()
//     })
// }

const onJSON = (request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(JSON.stringify(dataJson))
}

const PORT = 7777

console.log(`Server is running in port : ${ PORT }`)
Http.createServer(onJSON).listen(PORT)