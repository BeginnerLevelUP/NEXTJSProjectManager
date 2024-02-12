import { Schema, model,models } from "mongoose";

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
        type: Date,
        default:Date.now()
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
        default: Date.now()
    }
});

const Task =  models.Task || model('Task', taskSchema);

export default Task;

// later can a pre that checks the current date compared to the due date and if its withing a week 
// mark as important but if on the same day mark detrimental

