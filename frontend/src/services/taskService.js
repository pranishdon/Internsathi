// import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8000'; // Update with your backend API URL

// export const fetchTasks = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/?format=api/tasks`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error fetching tasks');
//   }
// };

// export const createTask = async (taskData) => {
//   try {
//     const response = await axios.post(`${API_URL}/?format=api/tasks`, taskData);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error creating task');
//   }
// };

// export const updateTask = async (taskId, updatedTaskData) => {
//   try {
//     const response = await axios.put(`${API_URL}/?format=api/tasks/${taskId}`, updatedTaskData);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error updating task');
//   }
// };

// export const deleteTask = async (taskId) => {
//   try {
//     await axios.delete(`${API_URL}/?format=api/tasks/${taskId}`);
//   } catch (error) {
//     throw new Error('Error deleting task');
//   }
// };

// export const toggleTask = async (taskId) => {
//   try {
//     const response = await axios.patch(`${API_URL}/?format=api/tasks/${taskId}/toggle`);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error toggling task');
//   }
// };
