import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "srv1740.hstgr.io",
  user: "u436222305_auth_db", // Default XAMPP user
  password: "Demploymentcorner@123", 
  database: "u436222305_auth_db",
});

export default db;
