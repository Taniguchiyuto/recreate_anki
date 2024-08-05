const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // ユーザーを作成
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  });

  console.log("New User:", newUser);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
