
import {  createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import taskReducer from "@/app/redux/features/task-slice"
import commentReducer from "@/app/redux/features/comment-slice"

// Features of Project Slice
/*
Get Users Projects
Create Project 
Delete Project 
Update Project
Add Person To Project 
*/



const projectSlice = createSlice({
  name: 'projects',
  initialState: [
   {
      _id: 1,
      dateCreated: Date.now(),
      name: 'exampleProject',
      description: "This is an example of what a project can look like",
      completed: false,
      gitrepo: "No Repositroy Link",
      deployedSite: "Not Yet Deployed",
    },

  ],
  reducers: {
    getProjects(state,action){
      return action.payload
    },
    // Create project
    addProject(state, action) {
      state.projects.push(action.payload);
    },
    // Delete project
    removeProject(state, action) {
      state.projects = state.projects.filter(project => project._id !== action.payload);
    },
    // Add person to project
    addUserToProject(state, action) {
      const { projectId, userId } = action.payload;
      const project = state.projects.find(project => project._id === projectId);
      if (project) {
        project.members.push(userId);
      }
    },
    // Update project
    updateProject(state, action) {
      const updatedProject = action.payload;
      const index = state.projects.findIndex(project => project._id === updatedProject._id);
      if (index !== -1) {
        state.projects[index] = updatedProject;
      }
    },
  },

});

export const {
  getProjects,
  addProject,
  removeProject,
  addUserToProject,
  updateProject,
} = projectSlice.actions;

const rootReducer = combineReducers({
  projects: projectSlice.reducer,
  tasks: taskReducer,
  comments: commentReducer,
});

export default rootReducer;
