import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root", // Default XAMPP user
  password: "", // Default XAMPP password (leave empty)
  database: "nextauth",
});

export default db;
