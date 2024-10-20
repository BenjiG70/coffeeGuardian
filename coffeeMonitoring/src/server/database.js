const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 4202;

app.use(cors());
app.use(bodyParser.json());

// connect to database
const db = new sqlite3.Database('coffeeguardian.db');

/**
 * 
 * @param {*} sql 
 * @param {*} res 
 */
function getData(sql, res) {
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).send(err.message);
      return;
    }
    if (!rows || rows.length === 0) {
      res.status(404).send('No data found');
      return;
    }
    res.status(200).json(rows);
    }
  );
}

/**
 * 
 * @param {*} sql 
 * @param {*} res 
 */
function changeData(sql, res){
  db.run(sql, [], (err, rows) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      const result = {};
      rows.forEach((row) => {
        result[row.ID] = row;
      });
      res.status(200).json(result);
    }
  );
}

/**
 * getAllUserData
 */
app.get('/get/all/user', (req, res) => {
  const sql = `SELECT * FROM USER`;
  getData(sql, res);
  }
);

app.get('/get/all/coffee', (req, res) => {
    const sql = `SELECT * FROM USER`;
    getData(sql, res);
    }
  );
app.get('/get/actual/coffee', (req, res) => {
    const sql = `SELECT * FROM USER`;
    getData(sql, res);
    }
  );
app.get('/get/week/coffee', (req, res) => {
    const sql = `SELECT * FROM USER`;
    getData(sql, res);
    }
  );
app.get('/get/yearly/coffee', (req, res) => {
    const sql = `SELECT * FROM USER`;
    getData(sql, res);
    }
  );
  app.get('/get/yearly_registered/user', (req, res) => {
    const sql = `SELECT * FROM USER`;
    getData(sql, res);
    }
  )

app.listen(port, () => {    
  console.log(`Server läuft auf http://localhost:${port}`);
  }
);