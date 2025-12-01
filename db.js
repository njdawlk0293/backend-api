import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

// Определяем, находимся ли мы на облачном сервере
const connectionString = process.env.DATABASE_URL;

// Настройки пула
export const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: connectionString ? { rejectUnauthorized: false } : false,
  host: connectionString ? undefined : process.env.PGHOST,
  user: connectionString ? undefined : process.env.PGUSER,
  password: connectionString ? undefined : process.env.PGPASSWORD,
  database: connectionString ? undefined : process.env.PGDATABASE,
  port: connectionString ? undefined : process.env.PGPORT,
});

// Соединение
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('DB connection error:', err));
