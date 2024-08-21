require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

async function main() {
  // Model データの挿入

  // 世界史一問一答デッキの作成

  // CSVファイルの正しいパスを指定
  const csvFilePath = path.join(
    __dirname,
    "..",
    "api-server",
    "files",
    "questions_and_answers.csv"
  );

  // CSVファイルを読み込み、NoteとCardを挿入
  await new Promise((resolve, reject) => {
    const insertPromises = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        // 各行の処理をPromiseにして配列に追加
        const insertPromise = (async () => {
          try {
            // CSVの各行からQuestionとAnswerを取得
            const question = row["Question"];
            const answer = row["Answer"];

            // Noteの挿入
            const note = await prisma.note.create({
              data: {
                guid: Math.random().toString(36).substring(7), // ランダムなGUID
                mid: 2,
                mod: Math.floor(Date.now() / 1000), // 現在のタイムスタンプ
                usn: 1,
                tags: "world history",
                flds: JSON.stringify([question, answer]),
                sfld: question,
                csum: Math.floor(Math.random() * 1000000000), // ランダムなチェックサム
                flags: 0,
                data: '{"extra": "info"}',
              },
            });

            // Cardの挿入
            await prisma.card.create({
              data: {
                nid: note.id,
                ord: 0,
                mod: Math.floor(Date.now() / 1000),
                usn: 1,
                type: 0,
                queue: 0,
                due: Math.floor(Date.now() / 1000),
                ivl: 1.0,
                factor: 3000,
                reps: 0,
                lapses: 0,
                left: 0,
                odue: 0,
                odid: 0,
                flags: 1,
                data: '{"hint": "Remember this fact!"}',
                did: 4,
              },
            });

            console.log(`Inserted card for question: ${question}`);
          } catch (error) {
            console.error("Error inserting data:", error);
          }
        })();

        insertPromises.push(insertPromise);
      })
      .on("end", async () => {
        // 全てのPromiseが解決するまで待機
        await Promise.all(insertPromises);
        console.log("CSVファイルの処理が完了しました。");
        resolve();
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        reject(error);
      });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
