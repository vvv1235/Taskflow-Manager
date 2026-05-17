import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default user
  const user = await prisma.user.upsert({
    where: { email: 'admin@taskflow.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@taskflow.com',
    },
  });
  console.log(`✅ User created: ${user.name} (${user.email})`);

  // Create categories
  const categoryData = [
    { name: 'Trabalho', color: '#6366f1' },
    { name: 'Pessoal', color: '#ec4899' },
    { name: 'Estudos', color: '#10b981' },
    { name: 'Saúde', color: '#f59e0b' },
    { name: 'Finanças', color: '#3b82f6' },
  ];

  const categories = [];
  for (const cat of categoryData) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    categories.push(category);
    console.log(`✅ Category created: ${category.name}`);
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
