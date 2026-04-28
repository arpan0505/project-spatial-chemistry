const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("SUCCESS! Connected to DB. Users:", users.length);
  } catch (e) {
    console.error("ERROR CONNECTING TO DB:");
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
