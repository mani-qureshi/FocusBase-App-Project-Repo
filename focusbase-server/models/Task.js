
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Task', TaskSchema);

