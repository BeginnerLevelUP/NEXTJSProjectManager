import { createSlice } from '@reduxjs/toolkit';
//Features of the Comment slice
/*
Get Comments From Project
Add Comment
Delete Commnet
Update Comment 
Get Reply From Comments
Reply To Comment
Delete Reply
Update Reply
*/
const commentSlice = createSlice({
  name: 'comments',
  initialState: [
    {
      comment_id:1,
      project_id:1,
      text:"first comment",
      user:null,
      createdAt:Date.now(),
      replies:[
        {
          comment_id:1,
          reply_id:1,
          text:'first reply',
          user:null,
          createdAt:Date.now()
        }
      ]
    }
  ],
  reducers: {
    // Add comment
    addComment(state, action) {
      const newComment = action.payload;
      state.push(newComment);
    },
    // Delete comment
    deleteComment(state, action) {
      const commentId = action.payload;
      return state.filter(comment => comment.id !== commentId);
    },
    // Update comment
    updateComment(state, action) {
      const updatedComment = action.payload;
      const commentIndex = state.findIndex(comment => comment.id === updatedComment.id);
      if (commentIndex !== -1) {
        state[commentIndex] = updatedComment;
      }
    },
    // Add reply to comment
    addReply(state, action) {
      const { commentId, reply } = action.payload;
      const comment = state.find(comment => comment.id === commentId);
      if (comment) {
        comment.replies.push(reply);
      }
    },
    // Delete reply
    deleteReply(state, action) {
      const { commentId, replyId } = action.payload;
      const comment = state.find(comment => comment.id === commentId);
      if (comment) {
        comment.replies = comment.replies.filter(reply => reply.id !== replyId);
      }
    },
    // Update reply
    updateReply(state, action) {
      const { commentId, updatedReply } = action.payload;
      const comment = state.find(comment => comment.id === commentId);
      if (comment) {
        const replyIndex = comment.replies.findIndex(reply => reply.id === updatedReply.id);
        if (replyIndex !== -1) {
          comment.replies[replyIndex] = updatedReply;
        }
      }
    },
  },
});

export const {
  addComment,
  deleteComment,
  updateComment,
  addReply,
  deleteReply,
  updateReply,
} = commentSlice.actions;

export default commentSlice.reducer;
