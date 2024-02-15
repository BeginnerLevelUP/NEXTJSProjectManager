import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import taskReducer from "@/redux/features/task-slice"
import commentReducer from "@/redux/features/comment-slice"
//Features of Project Slice
/*
Get Users Projects
Create Project 
Delete Project 
Update Project
Add Person To Project 
*/
// const API_URL ='https://dummyjson.com/recipes';

// const fetchProjectsFromAPI = async () => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error('Failed to fetch projects');
//     }
//     const data = await response.json();
//     return data; 
//   } catch (error) {
//     throw error; 
//   }
// };

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
    // Get user's projects
    getProjects(state, action) {
      // Handle fetching projects from the backend or any other logic
    },
    // Create project
    addProject(state, action) {
      const newProject = action.payload;
      state.push(newProject);
    },
    // Delete project
    removeProject(state, action) {
      const projectId = action.payload;
      return state.filter(project => project._id !== projectId); // corrected to _id
    },
    // Add person to project
    addUserToProject(state, action) {
      const { projectId, userId } = action.payload;
      const project = state.find(project => project._id === projectId); // corrected to _id
      if (project) {
        project.members.push(userId);
      }
    },
    // Update project (if needed)
    updateProject(state, action) {
      const updatedProject = action.payload;
      const projectIndex = state.findIndex(project => project._id === updatedProject._id); // corrected to _id
      if (projectIndex !== -1) {
        state[projectIndex] = updatedProject;
      }
    },
  },
});



export const {
  addProject,
  removeProject,
  addUserToProject,
  updateProject,
} = projectSlice.actions;

// // Creating async thunk action creator
// export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
//   // Thunk logic to fetch projects
//   return await fetchProjectsFromAPI();
// });



 
const rootReducer=combineReducers({
  projects: projectSlice.reducer,
  tasks: taskReducer,
  comments: commentReducer,
});

export default rootReducer