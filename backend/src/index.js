require('dotenv').config({path:'variables.env'})
const createServer = require('./createServer')
const db = require('./db')

const server = createServer();

//MMMM COOOKIESSS WANT SOME COOKIES HOOOMIEE HMMMMM????

server.start({
    cors: {
        credentials:true,
        origin:process.env.FRONTEND_URL
    }
}, deets => {
    console.log(`Server is running on port http://localhost:${deets.port}`)
})