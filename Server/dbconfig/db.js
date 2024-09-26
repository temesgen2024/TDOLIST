// Import required modules
require('dotenv').config();
const mysql = require("mysql2/promise");

// Prepare connection parameters to connect to the database
const dbConfig = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
};

// Check if environment variables are set
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
    throw new Error('Database configuration environment variables are missing!');
}

// Log the configuration values (for debugging)
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Test the database connection
async function testDbConnection() {
    try {
        const connection = await pool.getConnection(); // Get a connection from the pool
        await connection.query('SELECT 1'); // Run a simple query
        console.log('Database connected successfully');
        connection.release(); // Release the connection back to the pool
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}

// Call the testDbConnection function to check the connection
testDbConnection();

// Prepare a function that will execute SQL queries asynchronously
async function query(sql, params) {
    try {
        const [rows, fields] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error("Database query error:", error);
        throw error; // Rethrow the error for further handling if needed
    }
}

// Export the query function and pool for use in the application
module.exports = { query, pool };
