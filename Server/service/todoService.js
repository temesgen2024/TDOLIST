const db = require('../dbconfig/db');

// Function to get all todos
const getAllTodos = async () => {
    try {
        const results = await db.query(`
            SELECT todos.id, todos.title, todos.created_at, todos.completed, todos.description_id, descriptions.description 
            FROM todos
            LEFT JOIN descriptions ON todos.description_id = descriptions.id
        `);
        return results;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};

// Function to create a new todo
// Function to create a new todo
const createTodo = async (title, description) => {
    let connection; // Declare the connection variable here
    try {
        connection = await db.pool.getConnection(); // Get the connection
        await connection.beginTransaction();

        // Step 1: Insert the description
        const descriptionQuery = `INSERT INTO descriptions (description) VALUES (?)`;
        const [descriptionResult] = await connection.query(descriptionQuery, [description]);
        const descriptionId = descriptionResult.insertId;

        // Step 2: Insert the todo
        const todoQuery = `INSERT INTO todos (title, description_id) VALUES (?, ?)`;
        const [todoResult] = await connection.query(todoQuery, [title, descriptionId]);

        // Commit the transaction
        await connection.commit();
        return { todoId: todoResult.insertId, descriptionId };
    } catch (error) {
        if (connection) await connection.rollback(); // Check if connection is defined before rolling back
        console.error("Error creating todo:", error);
        throw error; // Rethrow for further handling
    } finally {
        if (connection) connection.release(); // Release the connection
    }
};



// Function to update a todo
const updateTodo = async (id, completed) => {
    try {
        const results = await db.query('UPDATE todos SET completed = ? WHERE id = ?', [completed, id]);
        return results;
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
        
    }
};

// Function to delete a todo
const deleteTodo = async (id) => {
    let connection; // Declare the connection variable here
    try {
        connection = await db.pool.getConnection(); // Get the connection
        await connection.beginTransaction();

        // Get the description_id associated with the todo
        const getDescriptionIdSql = `SELECT description_id FROM todos WHERE id = ?`;
        const [result] = await connection.query(getDescriptionIdSql, [id]);
        const descriptionId = result[0]?.description_id;

        // First, delete the todo
        const deleteTodoSql = `DELETE FROM todos WHERE id = ?`;
        await connection.query(deleteTodoSql, [id]);

        // Then, delete the description linked to the todo, if it exists
        if (descriptionId) {
            const deleteDescriptionSql = `DELETE FROM descriptions WHERE id = ?`;
            await connection.query(deleteDescriptionSql, [descriptionId]);
        }

        // Commit the transaction
        await connection.commit();
        return { todoDeleted: true, descriptionDeleted: !!descriptionId }; // Return true/false based on description existence
    } catch (error) {
        if (connection) await connection.rollback(); // Rollback if an error occurs
        console.error("Error deleting todo:", error);
        throw error;
    } finally {
        if (connection) connection.release(); // Release the connection
    }
};


module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };
