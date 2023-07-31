import express from 'express'

import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
import apiConfig from '../routes'
const server = express()

server.use(bodyParser.json())

import cors from 'cors'
server.use(cors())

server.use('/apis', apiConfig)

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
})