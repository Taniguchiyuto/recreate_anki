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
  db.query("SELECT id, deckname FROM DECK", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/deck/:id/cards", (req, res) => {
  console.log("kkoko");
  const cardId = req.params.id;
  const now = Math.floor(Date.now() / 1000); // 現在のUNIXタイムスタンプ

  // SQLクエリを実行してカードデータを取得
  const query = `
    SELECT 
      card.id, 
      note.flds, 
      card.queue, 
      card.type,
      card.due, 
      card.ivl, 
      card.factor, 
      card.reps, 
      card.lapses,
      card.odue, 
      card.odid,
      card.flags,
      card.data
    FROM card
    JOIN note ON card.nid = note.id
    WHERE card.did = ? AND card.due < ?
  `;

  db.query(query, [cardId, now], (err, results) => {
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

// app.post("/api/deck/:deckId/cards/:cardId/evaluate", (req, res) => {
//   const { deckId, cardId } = req.params;
//   const { evaluation } = req.body;

//   // ここで評価の処理を実装
//   console.log(
//     `Received evaluation for card ${cardId} in deck ${deckId}:`,
//     evaluation
//   );

//   // レスポンスを返す
//   res.status(200).json({ message: "Evaluation received" });
// });
// Start the server

app.post("/api/card/:id/update-due", (req, res) => {
  const cardId = req.params.id;
  const oneDayLater = Math.floor(Date.now() / 1000) + 86400; // 1日後のUNIXタイムスタンプ（86400秒 = 24時間）

  const query = "UPDATE card SET due = ? WHERE id = ?";

  db.query(query, [oneDayLater, cardId], (err, result) => {
    if (err) {
      console.error("Error updating due:", err);
      res.status(500).send("Server error");
    } else {
      res.send("Due updated successfully");
    }
  });
});

app.post("/api/card/:id/update-due", (req, res) => {
  const cardId = req.params.id; // リクエストURLからカードIDを取得
  const oneDayLater = Math.floor(Date.now() / 1000) + 86400; // 現在のUNIXタイムスタンプに86400秒（1日分）を追加

  const query = "UPDATE card SET due = ? WHERE id = ?"; // SQLクエリで due 値を更新

  db.query(query, [oneDayLater, cardId], (err, result) => {
    if (err) {
      console.error("Error updating due:", err);
      res.status(500).send("Server error");
    } else {
      res.send("Due updated successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
