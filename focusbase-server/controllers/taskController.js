
const Task = require('../models/Task');

// CREATE - POST /api/tasks
exports.createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// READ - GET /api/tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks); // Returns [] if empty by default
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};


// UPDATE - PUT /api/tasks/:_id
exports.updateTask = async (req, res) => {
    try {
        // { new: true } returns the document AFTER the update
        // { runValidators: true } ensures the new data follows the Schema rules
        const updatedTask = await Task.findByIdAndUpdate(
            req.params._id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        // Step 4: Catching invalid ID formats (CastError)
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: "Server Error" });
    }
};

// DELETE - DELETE /api/tasks/:_id
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params._id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid ID format" });
        }
        res.status(500).json({ message: "Server Error" });
    }
};




