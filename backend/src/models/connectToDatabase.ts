import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DATABASE_HOST as string,
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string
});

export default connection;