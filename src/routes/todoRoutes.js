const express = require('express');
const mongosoe = require('mongoose');
const Todo = mongosoe.model('Todo');
// const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// router.use(requireAuth);

router.get('/todo', async (req, res) => {
    // const tracks = await Track.find({ userId: req.user._id });
    const todos = await Todo.find({})
    res.send(todos);
})

router.post('/todo', async (req, res) => {
    // const { seatNo, email } = req.body;
    // console.log(seatNo, " ", email)
    // if (!seatNo || !email) {
    //     return res.status(422).send('you must provide Seat Number and email');
    // }

    const { seats, email } = req.body;
    seats.map((item) => {
        const todo = new Todo({ seatNo: item.seatNo, email });
        todo.save().then(() => {
            res.send(todo);
        }).catch((e) => {
            res.status(400).send(e);
        })
    })


})

router.delete('/todo', async (req, res) => {
    // console.log(req.params.todoId);
    const ids = req.body.deleteSeat;
    ids.map(async (id) => {
        await Todo.remove({ seatNo: id }).then((result) => {
            res.send(result);
        }).catch((err) => {
            console.log(err)
        })
    })
})

router.get('/seats', async (req, res) => {
    const { email } = req.body;
    console.log(email)
    const todos = await Todo.find({ "email": email });
    TextDecoderStream.send(todos);
})
module.exports = router;