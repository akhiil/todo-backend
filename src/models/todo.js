const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    crossShow: {
        type: Boolean,
        default: true
    }
});

mongoose.model('Todo', todoSchema);