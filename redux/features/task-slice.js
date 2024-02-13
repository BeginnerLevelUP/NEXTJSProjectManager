import { createSlice } from '@reduxjs/toolkit';
// Features of the Task Slice
/*
Get Tasks From Project
Add Task
Remove Task
Update Task
Assign Task
*/
const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    // Get tasks from project
    getTasks(state, action) {
      // Handle fetching tasks from the backend or any other logic
    },
    // Add task
    addTask(state, action) {
      const newTask = action.payload;
      state.push(newTask);
    },
    // Remove task
    removeTask(state, action) {
      const taskId = action.payload;
      return state.filter(task => task.id !== taskId);
    },
    // Update task
    updateTask(state, action) {
      const updatedTask = action.payload;
      const taskIndex = state.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state[taskIndex] = updatedTask;
      }
    },
    // Assign task
    assignTask(state, action) {
      const { taskId, assigneeId } = action.payload;
      const task = state.find(task => task.id === taskId);
      if (task) {
        task.assigneeId = assigneeId;
      }
    },
  },
});

export const {
  getTasks,
  addTask,
  removeTask,
  updateTask,
  assignTask,
} = taskSlice.actions;

export default taskSlice.reducer;