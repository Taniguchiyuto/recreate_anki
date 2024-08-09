require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
async function main() {
  // Model データの挿入
  const model = await prisma.model.create({
    data: {
      name: "Basic",
      flds: '[{"name": "Front"}, {"name": "Back"}]',
      templates:
        '[{"name": "Card 1", "frontHtml": "{{Front}}", "backHtml": "{{Back}}"}]',
      css: "body { font-family: Arial; }",
      conf: '{"fontSize": 12}',
    },
  });

  // Note データの挿入
  const note = await prisma.note.create({
    data: {
      guid: "abcd1234",
      mid: model.id,
      mod: 1590000000,
      usn: 1,
      tags: "science",
      flds: '["Question text","Answer text"]',
      sfld: "Question text",
      csum: 123456789,
      flags: 0,
      data: '{"extra": "info"}',
    },
  });

  // Deck データの挿入
  const deck = await prisma.deck.create({
    data: {
      userId: 1,
      deckName: "Science Deck",
    },
  });

  // Card データの挿入
  const card = await prisma.card.create({
    data: {
      nid: note.id,
      ord: 0,
      mod: 1590000000,
      usn: 1,
      type: 0,
      queue: 0,
      due: 1590000000,
      ivl: 1.0,
      factor: 2.5,
      reps: 0,
      lapses: 0,
      left: 0,
      odue: 0,
      odid: 0,
      flags: 1,
      data: '{"hint": "Remember the basics!"}',
      did: 1,
    },
  });

  // Col データの挿入
  const col = await prisma.col.create({
    data: {
      crt: 1590000000,
      mod: 1590000000,
      scm: 11,
      ver: 2,
      dty: 0,
      usn: 1,
      ls: 1590000000,
      conf: '{"studyOptions": {"new": 20, "rev": 100}}',
      models: '[{"id": 1, "name": "Basic"}]',
      decks: '[{"id": 1, "name": "Science Deck"}]',
      dconf: '[{"id": 1, "name": "Default"}]',
      tags: '["tag1", "tag2"]',
    },
  });

  console.log("All sample data inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
