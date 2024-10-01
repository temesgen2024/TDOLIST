// src/services/todoService.js
const API_URL = 'http://localhost:5000'; // Update this with your actual backend URL

// Fetch all todos
export const fetchTodos = async () => {
    try {
        const response = await fetch(`http://localhost:5000/todos`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

// Create a new todo
export const createTodo = async (title, description) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });
        if (!response.ok) throw new Error('Failed to create todo');
        return await response.json();
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
};

// Update a todo's completed status
export const updateTodo = async (id, completed) => {
    try {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        });
        if (!response.ok) throw new Error('Failed to update todo');
        return await response.json();
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};

// Delete a todo (and its description)
export const deleteTodo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete todo');
        return await response.json();
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};
