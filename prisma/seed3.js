require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const notes = [];
  const cards = [];

  for (let i = 0; i < 5; i++) {
    // Noteを作成
    const note = await prisma.note.create({
      data: {
        guid: `guid${i}`,
        mid: 1, // 既存のモデルIDを使ってください
        mod: 1590000000 + i,
        usn: i,
        tags: `tag${i}`,
        flds: JSON.stringify([`Question text ${i}`, `Answer text ${i}`]), // JSON文字列として保存
        sfld: `Question text ${i}`,
        csum: 123456789 + i,
        flags: i,
        data: `{"extra": "info ${i}"}`,
      },
    });
    notes.push(note);

    // Cardを作成（note.idを使って正しいNoteに関連付ける）
    const card = await prisma.card.create({
      data: {
        nid: note.id, // note.idを使用
        did: 1, // 既存のデッキIDを使ってください
        ord: i,
        mod: 1590000000 + i,
        usn: i,
        type: 0,
        queue: 0,
        due: 0,
        ivl: 2.5, // ivlの初期値を2.5に設定
        factor: 0,
        reps: 0,
        lapses: 0,
        left: 0,
        odue: 0,
        odid: 0,
        flags: 0,
        data: `{"extra": "card info ${i}"}`,
      },
    });
    cards.push(card);
  }

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
