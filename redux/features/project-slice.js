import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//Features of Project Slice
/*
Get Users Projects
Create Project 
Delete Project 
Update Project
Add Person To Project 
*/
const API_URL ='https://dummyjson.com/recipes';

const fetchProjectsFromAPI = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    throw error; 
  }
};

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
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
      return state.filter(project => project.id !== projectId);
    },
    // Add person to project
    addUserToProject(state, action) {
      const { projectId, userId } = action.payload;
      const project = state.find(project => project.id === projectId);
      if (project) {
        project.members.push(userId);
      }
    },
    // Update project (if needed)
    updateProject(state, action) {
      const updatedProject = action.payload;
      const projectIndex = state.findIndex(project => project.id === updatedProject.id);
      if (projectIndex !== -1) {
        state[projectIndex] = updatedProject;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsFromAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectsFromAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjectsFromAPI.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addProject,
  removeProject,
  addUserToProject,
  updateProject,
} = projectSlice.actions;

// Creating async thunk action creator
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  // Thunk logic to fetch projects
  return await fetchProjectsFromAPI();
});

export default projectSlice.reducer;
