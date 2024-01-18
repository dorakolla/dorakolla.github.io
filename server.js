
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql2/promise'); 
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const dbConfig = {
  host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  user: 'HDSAbakwBGy7Vwd.root',
  password: 'xES8HhQWeSQukywf',
  database: 'insightvault',
  port:4000,
  ssl: {
    rejectUnauthorized: false,
  }
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Acquire a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to TiDB:', err);
    return;
  }
  console.log('Connected to TiDB database.');
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.get('/getRandomQuote', async (req, res) => {
  const tableName = req.query.tableName;

  if (!tableName) {
    return res.status(400).json({ error: 'Table name is required.' });
  }

  try {
    const [rows] = await pool.execute(`SELECT * FROM ${tableName} ORDER BY RAND() LIMIT 1`);
    res.json({ quote: rows });
  } catch (err) {
    console.error('Failed to execute statement due to the following error: ' + err.message);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/addQuote', async (req, res) => {
  const tableName = req.body.tableName;
  const quote = req.body.quote;

  if (!tableName || !quote) {
    return res.status(400).json({ error: 'Table name and quote are required.' });
  }

  try {
    const [rows] = await pool.execute(`SELECT MAX(ID) AS maxId FROM ${tableName}`);
    const id = (rows[0] && rows[0].maxId) || 0;
    const newId = id + 1;

    // Insert the new quote with the incremented ID
    await pool.execute(`INSERT INTO ${tableName} (ID, QUOTE) VALUES (?, ?)`, [newId, quote]);

    res.json({ success: true });
  } catch (err) {
    console.error('Failed to execute statement due to the following error: ' + err.message);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});