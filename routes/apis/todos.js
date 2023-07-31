import express from 'express'
const router = express.Router();
import fs from 'fs'
import todosMiddlewares from '../../middlewares/todos.middlewares';

const todosDataPath  = './dev-data/todos.json';

let todosData = JSON.parse(fs.readFileSync(todosDataPath, 'utf8'))

router.get('/', todosMiddlewares.checkAdmin, (req, res) => {
    res.json(todosData)
})

router.get('/:todosId', (req, res) => {
    const {todosId} = req.params;
    const todosDetail = todosData.find(todos => todos.id == todosId)
    if(todosDetail) {
        res.json(todosDetail)
    } else {
        res.status(404).json({ message: 'todos not found'})
    }
})

router.post('/', (req,res) => {
    const { title, completed } = req.body;
    const newTodos = { id: (todosData.length + 1) + 1, title, completed}
    todosData.push(newTodos)
    fs.writeFileSync(todosDataPath, JSON.stringify(todosData))
    res.json(newTodos)
})

router.put('/:todosId', (req, res) => {
    const { todosId } = req.params
    const { title, completed } = req.body
    const todosIndex = todosData.findIndex(todos => todos.id == todosId)
    if (todosIndex !== -1 ) {
        todosData[todosIndex].title = title;
        todosData[todosIndex].completed = completed;
        fs.writeFileSync(todosDataPath, JSON.stringify(todosData))
        res.json(todosData[todosIndex])
    } else {
        res.status(404).json({ message: 'User not found'})
    }
})

router.delete('/:todosId', (req, res) => {
    const { todosId } = req.params;
    todosData = todosData.filter(todos => todos.id !== todosId)
    fs.writeFileSync(todosDataPath, JSON.stringify(todosData))
    res.json({ message: 'Delete  successfully'})
})
  
module.exports =  router;