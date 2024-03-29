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
  initialState: [
    {
      task_id:1,
      project_id:1,
      createdAt:Date.now(),
      name:"First Task",
      description: "A Description of your first task",
      status:"Pending",
      dueDate:null,
      assignedTo:[],
      ranking:"Regular"
    }
  ],
  reducers: {
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
  addTask,
  removeTask,
  updateTask,
  assignTask,
} = taskSlice.actions;

export default taskSlice.reducer;