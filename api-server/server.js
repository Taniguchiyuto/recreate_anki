require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 8000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "Alan",
  password: process.env.DB_PASSWORD || "kokekiko2525",
  database: process.env.DB_NAME || "anki_db",
});

// Open the MySQL connection
db.connect((error) => {
  if (error) {
    console.error("Failed to connect to the database:", error.message);
    return;
  }
  console.log("Successfully connected to the database.");
});

// ChatGPT API 呼び出し関数
async function generateText(prompt) {
  try {
    console.log("Sending request to ChatGPT API with prompt:", prompt);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "system", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Received response from ChatGPT API:", response.data);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(
      "Error generating text with ChatGPT:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

// Define API endpoints
app.get("/api/client", (req, res) => {
  console.log("Received request for /api/client");
  db.query("SELECT id, deckname FROM DECK", (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }
    console.log("Sending response with deck data:", results);
    res.json(results);
  });
});

app.get("/api/deck/:id/cards", (req, res) => {
  console.log(
    "Received request for /api/deck/:id/cards with id:",
    req.params.id
  );
  const cardId = req.params.id;
  const now = Math.floor(Date.now() / 1000); // 現在のUNIXタイムスタンプ

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
      console.error("Error fetching cards:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    if (results.length === 0) {
      console.log("No cards found for deck id:", cardId);
      res.status(404).json({ error: "No cards found" });
    } else {
      console.log("Sending response with card data:", results);
      res.json(results);
    }
  });
});

app.post("/api/card/:id/update", async (req, res) => {
  const cardId = req.params.id;
  const { option } = req.body; // クライアントからの選択肢 (again, hard, good, easy)

  console.log(
    "Received request to update card with id:",
    cardId,
    "and option:",
    option
  );

  const selectQuery = "SELECT ivl, factor, reps, lapses FROM card WHERE id = ?";
  db.query(selectQuery, [cardId], async (err, result) => {
    if (err) {
      console.error("Error fetching card:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }

    if (result.length === 0) {
      console.log("Card not found with id:", cardId);
      res.status(404).json({ error: "Card not found" });
      return;
    }

    let { ivl, factor, reps, lapses } = result[0];
    console.log("Current card data:", { ivl, factor, reps, lapses });

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
        console.log("Invalid option received:", option);
        res.status(400).json({ error: "Invalid option" });
        return;
    }

    console.log("Updated card data:", { ivl, factor, reps, lapses });

    const due = Math.floor(Date.now() / 1000) + Math.floor(ivl * 86400); // インターバル（日数）を秒に変換して追加

    let generatedText = null;
    if (factor >= 2900) {
      const prompt = `Your factor is now ${factor}. Please generate a motivational message.`;
      generatedText = await generateText(prompt);
      console.log("Generated motivational message:", generatedText);
    }

    const updateQuery = `
          UPDATE card 
          SET ivl = ?, factor = ?, reps = ?, lapses = ?, due = ? 
          WHERE id = ?
      `;
    db.query(updateQuery, [ivl, factor, reps, lapses, due, cardId], (err) => {
      if (err) {
        console.error("Error updating card:", err);
        res.status(500).json({ error: "Server error" });
      } else {
        console.log("Card updated successfully:", {
          ivl,
          factor,
          reps,
          lapses,
          due,
          generatedText,
        });
        res.json({
          message: "Card updated successfully",
          ivl,
          factor,
          generatedText,
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
