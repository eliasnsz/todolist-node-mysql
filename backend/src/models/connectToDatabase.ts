import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: 'localhost', /*process.env.DATABASE_HOST as string*/
  user: 'mysql', /*process.env.DATABASE_USER as string*/
  password: 'root', /*process.env.DATABASE_PASSWORD as string */
  database: 'todolist', /*process.env.DATABASE_NAME as string */
});

export default connection;