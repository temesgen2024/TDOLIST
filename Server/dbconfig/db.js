// Import the mysql2 module promise wrapper
const mysql = require("mysql2/promise");

// Prepare connection parameters to connect to the database
const dbConfig = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Check if environment variables are set


// Create a connection pool
const pool = mysql.createPool(dbConfig);

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

// Export the query function for use in the application
module.exports = { query };
