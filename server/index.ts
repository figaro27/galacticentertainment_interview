const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const app = express();
const mysql = require('mysql');

app.use(bodyParser.json());

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

const conn = mysql.createConnection({
  host: process.env.DB_SERVER || 'localhost',
  user: process.env.DB_USER || 'root', /* MySQL User */
  password: process.env.DB_PASS || '', /* MySQL Password */
  database: process.env.DB_NAME || 'test' /* MySQL Database */
});

conn.connect((err) => {
  if(err) throw err;
  console.log('Mysql Connected with App...');
});

app.get('/api/calls',(req, res) => {
  let sqlQuery = "SELECT * FROM calls";
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

app.post('/api/call', (req, res) => {
  let data = { client: req.body.client, number: req.body.number, date: req.body.date };
  let sqlQuery = "INSERT INTO calls SET ?";
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

function apiResponse(results) {
  return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(8080, () => {
  console.log('Server started on port 8080...');
});