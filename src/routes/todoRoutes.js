const express = require('express');
const mongosoe = require('mongoose');
const Todo = mongosoe.model('Todo');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

router.get('/todo', async (req, res) => {
    // const tracks = await Track.find({ userId: req.user._id });
    const todos = await Todo.find({ userId: req.user._id });
    res.send(todos);
})

router.post('/todo', async (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(422).send('you must provide description');
    }

    const todo = new Todo({ description, userId: req.user._id });
    todo.save().then(() => {
        res.send(todo);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

router.delete('/todo/:todoId', async (req, res) => {
    // console.log(req.params.todoId);
    try {
        const deletedTodo = await Todo.remove({ _id: req.params.todoId });
        res.send(deletedTodo);
    } catch (e) {
        res.send(e);
    }
})
module.exports = router;