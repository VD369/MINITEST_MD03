import express from 'express'
const router = express.Router()

import todosApi from './apis/todos'
router.use('/todos', todosApi)

module.exports = router