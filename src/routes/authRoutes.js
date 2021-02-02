const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, college, email, password } = req.body;
    // console.log(req.body);

    const user = new User({ name, college, email, password });
    user.save().then(() => {
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
        res.send(token);
    }).catch((e) => {
        res.status(400).send(e.message)
    })
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send('must provide email and password');
    }

    const user = await User.findOne({ email: email });
    if (!user) {
        res.status(404).send('this email does not exist');
    }
    try {
        await user.comparePassword(password)
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        res.send({ user, token })
    } catch (err) {
        res.status(400).send('password is wrong');
    }
})


module.exports = router;