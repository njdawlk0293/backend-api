import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());

app.get('/data', async (req, res) => {
  const table = req.query.table || 'mytable';
  const sort = req.query.sort || 'id';
  const direction = req.query.direction === 'desc' ? 'DESC' : 'ASC';

  // Собираем фильтры
  let filterSql = '';
  const values = [];
  let i = 1;
  for (let key in req.query.filter || {}) {
    filterSql += `${i === 1 ? 'WHERE' : 'AND'} ${key} = $${i} `;
    values.push(req.query.filter[key]);
    i++;
  }

  try {
    const result = await pool.query(
      `SELECT * FROM ${table} ${filterSql} ORDER BY ${sort} ${direction}`,
      values
    );

    // Отправляем на страницу
    res.json({
      columns: result.fields.map(f => f.name),
      rows: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('DB error');
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Backend is running");
});