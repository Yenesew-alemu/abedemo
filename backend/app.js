const express = require('express');
const mysql = require('mysql2');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
const port = 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const db = mysql.createConnection({
  
  host: '127.0.0.1',
  user: 'demoapp',
  password: 'demoapp',
  database: 'demoapp'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});
app.use(express.json());
// to add the chors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', (req, res) => {
  res.send('testing!');

});
app.post('/add-employee', (req, res) => {
  console.log(req.body);
  const sql = `INSERT INTO employtest (first_name, last_name, email, password) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error adding employee' });
    } else {
      const response = {
        status: 'success',
        message: 'Employee added successfully'};
        res.status(201).json(response);
    }
  });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const sql = `SELECT * FROM employtest WHERE email = '${email}' AND password = '${password}'`;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error during login' });
    } else {
      if (results.length === 1) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).send({ message: 'Invalid email or password' });
      }
    }
  });
});






  
