const suptest = require('supertest')
const app = require('../server')

let token

beforeAll(async (done) => {
    const getData = await suptest(app)
        .get('/product/api/all')
    console.log(getData)
})

console.log(token)