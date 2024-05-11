import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    dueDate: {
        type: String,
        default:"No Due Date"
    },
    assignedTo: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    ranking: {
        type: String,
        enum: ['Regular', 'Important', 'Detrimental'],
        default: 'Regular'
    },
    createdAt: {
        type: Date,
        default: () => new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short' })
    }
});

const Task = models.Task || model('Task', taskSchema);

export default Task;
