require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    // idが1から6のカードを削除
    for (let i = 1; i <= 6; i++) {
      await prisma.card.deleteMany({
        where: {
          nid: i,
        },
      });

      // noteを削除
      const deletedNote = await prisma.note.delete({
        where: {
          id: i,
        },
      });

      console.log(`Deleted note with id ${i}:`, deletedNote);
    }
  } catch (error) {
    console.error("Error deleting notes and cards:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
