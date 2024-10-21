const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 4202;

app.use(cors());
app.use(bodyParser.json());

const path = require('path');

// Construct the absolute path to the database file
const dbPath = path.join(__dirname, '../../../database/coffeeguardian.sqlite');

// Open the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

/**
 * 
 * @param {*} sql 
 * @param {*} res 
 */
function getData(sql, res) {
  console.log(sql)
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
  console.log(sql)
  db.run(sql, [], (err, rows) => {
      if (err) {
        res.status(400).send(err.message);
        console.log(err.message)
        return;
      }
      const result = {};
      rows.forEach((row) => {
        result[row.ID] = row;
      });
      res.status(200).json(result);
    }
  );
  console.log(res)
}

/**
 * getAllUserData
 */
app.get('/get/all/user', (req, res) => {
  const sql = `SELECT * FROM USER`;
  getData(sql, res);
  }
);
app.get('/get/all/log', (req, res) => {
    const sql = `SELECT * FROM LOG`;
    getData(sql, res);
    }
  );
app.get('/get/all/coffee', (req, res) => {
    const sql = `SELECT * FROM COFFEE`;
    getData(sql, res);
    }
  );
app.get('/get/actual/coffee', (req, res) => {
    const sql = `SELECT * FROM LOG`;
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
  //get/yearly/log
  app.get('/get/monthly/log', (req, res) => {
    const sql = `SELECT COUNT(STATUS) 
                FROM LOG 
                WHERE strftime('%Y', TIME) = strftime('%Y', 'now')
                GROUP BY strftime('%m', TIME)
                ORDER BY strftime('%m', TIME);
                `;
    getData(sql, res);
    }
  )
  app.get('/get/yearly/log', (req, res) => {
    const sql = `SELECT STATUS, COUNT(STATUS) AS VALUE
                 FROM LOG 
                 WHERE strftime('%Y', TIME) = strftime('%Y', 'now')
                 GROUP BY STATUS;
                `;
    getData(sql, res);
    }
  )


  app.get('/get/unregistered/user', (req, res) => {
    const sql = `SELECT l.TagID, MAX(l.TIME) as TIME
                 FROM LOG l
                 LEFT JOIN USER u ON l.TagID = u.UID
                 GROUP BY l.TagID;
                `;
    getData(sql, res);
    }
  )

  app.post('/update/user', (req, res) => {

    const sql = `UPDATE USER
                 SET 
                `;
    getData(sql, res);
    }
  )
  app.post('/insert/user', (req, res) => {
    console.log("in insert!")
    const { UID, REGISTERED_SINCE, SURNAME, NAME, MAIL, CREDIT, COFFEE_COUNT } = req.body;
    console.log(UID, REGISTERED_SINCE, SURNAME, NAME, MAIL, CREDIT, COFFEE_COUNT)
    const sql = `
                INSERT INTO USER (UID, REGISTERED_SINCE, SURNAME, NAME, MAIL, CREDIT, COFFEE_COUNT) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `;

                db.run(sql, [UID, REGISTERED_SINCE, SURNAME, NAME, MAIL, CREDIT, COFFEE_COUNT,], function (err) {
                  if (err) {
                    // Wenn ein Fehler auftritt, sende die Antwort und kehre zurück, um den Rest der Logik zu stoppen
                    return res.status(500).json({ error: "Datenbankfehler: " + err.message });
                  }
              
                  // Wenn die Einfügung erfolgreich ist, sende die Antwort nur einmal
                  res.status(200).json({ message: 'Daten erfolgreich eingefügt', id: this.lastID });
                });
              });
//     changeData(sql, [UID, REGISTERED_SINCE, SURNAME, NAME, MAIL, CREDIT, COFFEE_COUNT], res);
// });

app.listen(port, () => {    
  console.log(`Server läuft auf http://localhost:${port}`);
  }
);