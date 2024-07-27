const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: "mysql",
  user: "Alan",
  password: "kokekiko2525",
  database: "anki_db",
});

// Open the MySQL connection
db.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");

  // データベース接続のテストクエリ
  db.query("SELECT 1 + 1 AS solution", (err, results) => {
    if (err) throw err;
    console.log("The solution is: ", results[0].solution);
  });
});

// Define API endpoints
app.get("/api/client", (req, res) => {
  db.query("SELECT id, deck_name FROM DECKS", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/deck/:id/cards", (req, res) => {
  const cardId = req.params.id;

  // SQLクエリを実行してカードデータを取得
  const query = `
  SELECT cards.id, notes.flds, cards.queue, cards.type
  FROM cards
  JOIN notes ON cards.nid = notes.id
  WHERE cards.did = ?
`;
  db.query(query, [cardId], (err, results) => {
    if (err) {
      console.error("データ取得エラー:", err);
      res.status(500).send("サーバーエラー");
      console.log("ko");
      return;
    }

    if (results.length === 0) {
      res.status(404).send("カードが見つかりません");
      console.log("ここ");
    } else {
      res.json(results);
      console.log("koko");
    }
  });
});
// Start the server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
