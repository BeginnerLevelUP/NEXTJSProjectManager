import { Schema, model,models } from "mongoose";

const replySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [replySchema]
});

const Comment =  models.Comment|| model('Comment', commentSchema);

export default Comment;
