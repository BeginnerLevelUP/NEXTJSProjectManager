import { configureStore } from '@reduxjs/toolkit'
import projectReducer from "@/redux/features/project-slice"
import taskReducer from "@/redux/features/task-slice"
import commentReducer from "@/redux/features/comment-slice"
export default configureStore({
  reducer: {
    projects:projectReducer,
    task:taskReducer,
    comments:commentReducer,
  },
})
// This is wrong lol it should be a user and their projects
/* 
in the store should only be 
user 
projects
tasks comments should be inside of projects 
*/