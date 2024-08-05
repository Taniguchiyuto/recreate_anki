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
