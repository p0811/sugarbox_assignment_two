const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var TaskSchema = new mongoose.Schema({

    user_id: {
        type: String,
        index: true,
        required: true
    },
    task_title: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"]
    },
    task_description: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"]
    },
    is_task_active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

TaskSchema.plugin(uniqueValidator);
const UserTask = mongoose.model('user_tasks', TaskSchema);

module.exports = UserTask;