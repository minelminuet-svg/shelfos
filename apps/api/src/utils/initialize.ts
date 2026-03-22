import prisma from '../utils/prisma';

export async function initializeDemo() {
  const org = await prisma.organization.upsert({
    where: { slug: 'demo-store' },
    update: {
      name: 'Demo Retail Store',
    },
    create: {
      name: 'Demo Retail Store',
      slug: 'demo-store',
    },
  });

  process.env.DEMO_ORG_ID = org.id;
  console.log(`[bootstrap] Demo organization ready: ${org.id}`);
  return org;
}
