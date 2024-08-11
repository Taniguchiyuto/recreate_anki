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

// app.post("/api/card/:id/update-due", (req, res) => {
//   const cardId = req.params.id;
//   const oneDayLater = Math.floor(Date.now() / 1000) + 86400; // 1日後のUNIXタイムスタンプ（86400秒 = 24時間）

//   const query = "UPDATE card SET due = ? WHERE id = ?";

//   db.query(query, [oneDayLater, cardId], (err, result) => {
//     if (err) {
//       console.error("Error updating due:", err);
//       res.status(500).send("Server error");
//     } else {
//       res.send("Due updated successfully");
//     }
//   });
// });

app.post("/api/card/:id/update", (req, res) => {
  const cardId = req.params.id;
  const { option } = req.body; // クライアントからの選択肢 (again, hard, good, easy)

  // カード情報を取得
  const selectQuery = "SELECT ivl, factor, reps, lapses FROM card WHERE id = ?";
  db.query(selectQuery, [cardId], (err, result) => {
    if (err) {
      console.error("Error fetching card:", err);
      res.status(500).send("Server error");
      return;
    }

    if (result.length === 0) {
      res.status(404).send("Card not found");
      return;
    }

    let { ivl, factor, reps, lapses } = result[0];

    // 選択に基づいて次のインターバルを計算
    switch (option) {
      case "again":
        lapses += 1;
        ivl = 1; // 再試行時のインターバル（1日）
        factor = Math.max(factor - 200, 1300); // イージーファクターの減少、最低1300にする
        break;
      case "hard":
        ivl = ivl * 1.2; // ハード選択時のインターバル
        factor = Math.max(factor - 150, 1300); // イージーファクターを減少
        break;
      case "good":
        reps += 1;
        ivl = (ivl * factor) / 1000; // グッド選択時のインターバル計算
        break;
      case "easy":
        reps += 1;
        ivl = ((ivl * factor) / 1000) * 1.5; // イージー選択時のインターバル計算
        factor = factor + 150; // イージーファクターを増加
        break;
      default:
        res.status(400).send("Invalid option");
        return;
    }

    // 次の復習日を計算
    const due = Math.floor(Date.now() / 1000) + Math.floor(ivl * 86400); // インターバル（日数）を秒に変換して追加

    // カードの情報を更新
    const updateQuery = `
          UPDATE card 
          SET ivl = ?, factor = ?, reps = ?, lapses = ?, due = ? 
          WHERE id = ?
      `;
    db.query(updateQuery, [ivl, factor, reps, lapses, due, cardId], (err) => {
      if (err) {
        console.error("Error updating card:", err);
        res.status(500).send("Server error");
      } else {
        res.send("Card updated successfully");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
