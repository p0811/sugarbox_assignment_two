const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "can't be blank"],
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    is_user_active: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);
const Users = mongoose.model("suggerbox_users", UserSchema);
module.exports = Users;