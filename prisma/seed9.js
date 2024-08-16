require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const notes = [];
  const cards = [];

  for (let i = 30; i < 38; i++) {
    // Noteを作成
    const note = await prisma.note.create({
      data: {
        guid: `guid${i}`,
        mid: 1, // 既存のモデルIDを使用
        mod: 1600000000 + i,
        usn: i,
        tags: `seed9Tag${i}`, // 新しいタグ
        flds: JSON.stringify([
          `New Question text ${i}`, // 新しい質問
          `New Answer text ${i}`, // 新しい回答
        ]),
        sfld: `New Question text ${i}`,
        csum: 987654321 + i,
        flags: i,
        data: `{"extra": "additional seed9 info ${i}"}`,
      },
    });
    notes.push(note);

    // Cardを作成（note.idを使って正しいNoteに関連付ける）
    const card = await prisma.card.create({
      data: {
        nid: note.id, // note.idを使用
        did: 1, // 既存のデッキIDを使用
        ord: i,
        mod: 1600000000 + i,
        usn: i,
        type: 0,
        queue: 0,
        due: 0,
        ivl: 1, // ivlの初期値を1に設定
        factor: 2500,
        reps: 0,
        lapses: 0,
        left: 0,
        odue: 0,
        odid: 0,
        flags: 0,
        data: `{"extra": "additional seed9 card info ${i}"}`, // 新しいカード情報
      },
    });
    cards.push(card);
  }

  console.log("Seed9 data created:");
  console.log({ notes, cards });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
