const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
    },
  });

  const books = await prisma.category.create({
    data: {
      name: "Books",
    },
  });

  // Create Products
  await prisma.product.create({
    data: {
      name: "Laptop",
      price: 1200.5,
      image: "http://example.com/laptop.png",
      categoryId: electronics.id,
    },
  });

  await prisma.product.create({
    data: {
      name: "The Great Gatsby",
      price: 15.99,
      image: "http://example.com/gatsby.png",
      categoryId: books.id,
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
