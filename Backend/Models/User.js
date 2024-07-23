// Backend/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
