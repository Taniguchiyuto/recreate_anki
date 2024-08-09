require("dotenv").config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: "Alice",
      email: "alice@example.com",
      password: "password123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "Bob",
      email: "bob@example.com",
      password: "password456",
    },
  });
  const deck1 = await prisma.deck.create({
    data: {
      userId: user1.id,
      deckName: "Biology 101",
    },
  });

  const deck2 = await prisma.deck.create({
    data: {
      userId: user2.id,
      deckName: "History of Art",
    },
  });

  console.log(`Created user with id: ${user1.id}`);
  console.log(`Created user with id: ${user2.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
