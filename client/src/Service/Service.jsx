// src/services/todoService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Update this with your actual backend URL

// Fetch all todos
export const fetchTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}/todos`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

// Create a new todo
export const createTodo = async (title, description) => {
    try {
        const response = await axios.post(`${API_URL}/create`, {
            title,
            description,
        });
        return response.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
};

// Update a todo's completed status
export const updateTodo = async (id, completed) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, {
            completed,
        });
        return response.data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};

// Delete a todo
export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};
