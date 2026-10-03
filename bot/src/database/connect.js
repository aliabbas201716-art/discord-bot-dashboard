const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  prisma,
  connect: async () => {
    await prisma.$connect();
    console.log("Connected to PostgreSQL");
  }
};
