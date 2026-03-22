import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[seed] Seeding database...');

  let org = await prisma.organization.findUnique({
    where: { slug: 'demo-store' },
  });

  if (!org) {
    org = await prisma.organization.create({
      data: {
        name: 'Demo Retail Store',
        slug: 'demo-store',
      },
    });
    console.log('[seed] Created organization:', org.name);
  } else {
    console.log('[seed] Organization already exists:', org.name);
  }

  let user = await prisma.user.findUnique({
    where: { email: 'admin@demo.com' },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: 'admin@demo.com',
        name: 'Admin User',
        password: 'hashed_password',
        role: 'admin',
        organizationId: org.id,
      },
    });
    console.log('[seed] Created user:', user.email);
  } else {
    console.log('[seed] User already exists:', user.email);
  }

  let store = await prisma.store.findUnique({
    where: {
      organizationId_code: {
        organizationId: org.id,
        code: 'STORE-001',
      },
    },
  });

  if (!store) {
    store = await prisma.store.create({
      data: {
        name: 'Main Store',
        code: 'STORE-001',
        organizationId: org.id,
      },
    });
    console.log('[seed] Created store:', store.name);
  } else {
    console.log('[seed] Store already exists:', store.name);
  }

  let backroom = await prisma.inventoryLocation.findUnique({
    where: {
      organizationId_code: {
        organizationId: org.id,
        code: 'BR-001',
      },
    },
  });

  if (!backroom) {
    backroom = await prisma.inventoryLocation.create({
      data: {
        name: 'Backroom',
        code: 'BR-001',
        type: 'backroom',
        organizationId: org.id,
      },
    });
  }

  let floor = await prisma.inventoryLocation.findUnique({
    where: {
      organizationId_code: {
        organizationId: org.id,
        code: 'FL-001',
      },
    },
  });

  if (!floor) {
    floor = await prisma.inventoryLocation.create({
      data: {
        name: 'Sales Floor',
        code: 'FL-001',
        type: 'store',
        organizationId: org.id,
      },
    });
  }

  console.log('[seed] Locations ready');

  const existingLinks = await prisma.store_InventoryLocation.findMany({
    where: { storeId: store.id },
  });

  if (existingLinks.length === 0) {
    await prisma.store_InventoryLocation.createMany({
      data: [
        { storeId: store.id, inventoryLocationId: backroom.id },
        { storeId: store.id, inventoryLocationId: floor.id },
      ],
    });
    console.log('[seed] Linked locations to store');
  } else {
    console.log('[seed] Store locations already linked');
  }

  let product1 = await prisma.product.findUnique({
    where: {
      organizationId_sku: {
        organizationId: org.id,
        sku: 'WIDGET-001',
      },
    },
  });

  if (!product1) {
    product1 = await prisma.product.create({
      data: {
        sku: 'WIDGET-001',
        name: 'Blue Widget',
        barcode: '1234567890',
        category: 'Widgets',
        brand: 'WidgetCo',
        price: 29.99,
        reorderPoint: 10,
        reorderQty: 25,
        organizationId: org.id,
      },
    });
  }

  let product2 = await prisma.product.findUnique({
    where: {
      organizationId_sku: {
        organizationId: org.id,
        sku: 'GADGET-001',
      },
    },
  });

  if (!product2) {
    product2 = await prisma.product.create({
      data: {
        sku: 'GADGET-001',
        name: 'Red Gadget',
        barcode: '0987654321',
        category: 'Gadgets',
        brand: 'GadgetCorp',
        price: 49.99,
        reorderPoint: 5,
        reorderQty: 15,
        organizationId: org.id,
      },
    });
  }

  console.log('[seed] Products ready');

  let supplier = await prisma.supplier.findUnique({
    where: {
      organizationId_code: {
        organizationId: org.id,
        code: 'SUP-001',
      },
    },
  });

  if (!supplier) {
    supplier = await prisma.supplier.create({
      data: {
        name: 'Wholesale Supplier Inc',
        code: 'SUP-001',
        email: 'sales@supplier.com',
        phone: '555-0123',
        organizationId: org.id,
      },
    });
    console.log('[seed] Created supplier');
  } else {
    console.log('[seed] Supplier already exists');
  }

  const existingSupplierProducts = await prisma.supplier_Product.findMany({
    where: { supplierId: supplier.id },
  });

  if (existingSupplierProducts.length === 0) {
    await prisma.supplier_Product.createMany({
      data: [
        { supplierId: supplier.id, productId: product1.id, isPreferred: true, leadDays: 7 },
        { supplierId: supplier.id, productId: product2.id, isPreferred: true, leadDays: 5 },
      ],
    });
    console.log('[seed] Linked products to supplier');
  } else {
    console.log('[seed] Supplier products already linked');
  }

  const existingBalances = await prisma.inventoryBalance.findMany({
    where: { organizationId: org.id },
  });

  if (existingBalances.length === 0) {
    await prisma.inventoryBalance.createMany({
      data: [
        {
          quantity: 20,
          organizationId: org.id,
          productId: product1.id,
          inventoryLocationId: backroom.id,
        },
        {
          quantity: 15,
          organizationId: org.id,
          productId: product1.id,
          inventoryLocationId: floor.id,
        },
        {
          quantity: 3,
          organizationId: org.id,
          productId: product2.id,
          inventoryLocationId: floor.id,
        },
      ],
    });
    console.log('[seed] Created inventory balances');
  } else {
    console.log('[seed] Inventory balances already exist');
  }

  const existingAlerts = await prisma.alert.findMany({
    where: {
      organizationId: org.id,
      type: 'low_stock',
    },
  });

  if (existingAlerts.length === 0) {
    await prisma.alert.create({
      data: {
        type: 'low_stock',
        severity: 'warning',
        status: 'open',
        productId: product2.id,
        organizationId: org.id,
        message: `Product "${product2.name}" is below reorder point (3 in stock, reorder point: 5)`,
        data: JSON.stringify({
          productId: product2.id,
          currentStock: 3,
          reorderPoint: 5,
        }),
      },
    });
    console.log('[seed] Created alert');
  } else {
    console.log('[seed] Alert already exists');
  }

  const existingPOs = await prisma.purchaseOrder.findMany({
    where: { organizationId: org.id },
  });

  if (existingPOs.length === 0) {
    await prisma.purchaseOrder.create({
      data: {
        orderNumber: 'PO-001',
        status: 'draft',
        supplierId: supplier.id,
        organizationId: org.id,
        totalAmount: 749.85,
        lineItems: {
          create: [
            {
              productId: product2.id,
              quantity: 15,
              unitPrice: 49.99,
              lineTotal: 749.85,
            },
          ],
        },
      },
      include: { lineItems: true },
    });
    console.log('[seed] Created purchase order draft');
  } else {
    console.log('[seed] Purchase order already exists');
  }

  const existingAutomations = await prisma.automation.findMany({
    where: { organizationId: org.id },
  });

  if (existingAutomations.length === 0) {
    await prisma.automation.create({
      data: {
        name: 'Auto-generate PO for low stock',
        description: 'When product stock falls below reorder point, create a PO draft for the preferred supplier',
        trigger: 'low_stock_alert',
        condition: JSON.stringify({
          severity: 'warning',
        }),
        action: JSON.stringify({
          type: 'generate_purchase_order',
          usePreferredSupplier: true,
        }),
        enabled: true,
        organizationId: org.id,
      },
    });
    console.log('[seed] Created automation rule');
  } else {
    console.log('[seed] Automation rule already exists');
  }

  console.log('\n[seed] Seed completed successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
