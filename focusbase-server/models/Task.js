
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This links it to the User model
    },
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

