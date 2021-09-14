const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    seatNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

mongoose.model('Todo', todoSchema);