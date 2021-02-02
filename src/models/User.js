const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified()) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next();
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next();
            }
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function (userPassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(userPassword, user.password, (err, isMatch) => {
            if (err) {
                reject(false);
            }

            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        })
    })
}

mongoose.model('User', userSchema);