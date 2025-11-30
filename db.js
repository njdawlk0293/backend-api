import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// Определяем, находимся ли мы на облачном сервере Render
const isOnline = process.env.DATABASE_URL ? true : false;
console.log('isOnline:', isOnline)

// Настройки пула
export const pool = new Pool({
  connectionString: isOnline ? process.env.DATABASE_URL : undefined,
  host: !isOnline ? process.env.PGHOST : undefined,
  user: !isOnline ? process.env.PGUSER : undefined,
  password: !isOnline ? process.env.PGPASSWORD : undefined,
  database: !isOnline ? process.env.PGDATABASE : undefined,
  port: !isOnline ? process.env.PGPORT : undefined,
  ssl: isOnline ? { rejectUnauthorized: false } : false
});

// Соединение
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('DB connection error:', err));
