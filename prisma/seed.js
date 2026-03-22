"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    // Create organization (or find existing)
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
        console.log('✓ Created organization:', org.name);
    }
    else {
        console.log('✓ Organization already exists:', org.name);
    }
    // Create user (or find existing)
    let user = await prisma.user.findUnique({
        where: { email: 'admin@demo.com' },
    });
    if (!user) {
        user = await prisma.user.create({
            data: {
                email: 'admin@demo.com',
                name: 'Admin User',
                password: 'hashed_password', // In real app, hash this
                role: 'admin',
                organizationId: org.id,
            },
        });
        console.log('✓ Created user:', user.email);
    }
    else {
        console.log('✓ User already exists:', user.email);
    }
    // Create store (or find existing)
    let store = await prisma.store.findUnique({
        where: { code: 'STORE-001' },
    });
    if (!store) {
        store = await prisma.store.create({
            data: {
                name: 'Main Store',
                code: 'STORE-001',
                organizationId: org.id,
            },
        });
        console.log('✓ Created store:', store.name);
    }
    else {
        console.log('✓ Store already exists:', store.name);
    }
    // Create locations (or find existing)
    let backroom = await prisma.inventoryLocation.findUnique({
        where: { code: 'BR-001' },
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
        where: { code: 'FL-001' },
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
    console.log('✓ Locations ready');
    // Link locations to store (check if already linked)
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
        console.log('✓ Linked locations to store');
    }
    else {
        console.log('✓ Store locations already linked');
    }
    // Create products (or find existing)
    let product1 = await prisma.product.findUnique({
        where: { sku: 'WIDGET-001' },
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
        where: { sku: 'GADGET-001' },
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
    console.log('✓ Products ready');
    // Create supplier (or find existing)
    let supplier = await prisma.supplier.findUnique({
        where: { code: 'SUP-001' },
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
        console.log('✓ Created supplier');
    }
    else {
        console.log('✓ Supplier already exists');
    }
    // Link products to supplier (check if already linked)
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
        console.log('✓ Linked products to supplier');
    }
    else {
        console.log('✓ Supplier products already linked');
    }
    // Create inventory balances (check if they exist)
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
                    quantity: 3, // Below reorder point
                    organizationId: org.id,
                    productId: product2.id,
                    inventoryLocationId: floor.id,
                },
            ],
        });
        console.log('✓ Created inventory balances');
    }
    else {
        console.log('✓ Inventory balances already exist');
    }
    // Create low-stock alert (check if it exists)
    const existingAlerts = await prisma.alert.findMany({
        where: {
            organizationId: org.id,
            type: 'low_stock'
        },
    });
    if (existingAlerts.length === 0) {
        await prisma.alert.create({
            data: {
                type: 'low_stock',
                severity: 'warning',
                status: 'open',
                organizationId: org.id,
                message: `Product "${product2.name}" is below reorder point (3 in stock, reorder point: 5)`,
                data: JSON.stringify({
                    productId: product2.id,
                    currentStock: 3,
                    reorderPoint: 5,
                }),
            },
        });
        console.log('✓ Created alert');
    }
    else {
        console.log('✓ Alert already exists');
    }
    // Create purchase order draft (check if it exists)
    const existingPOs = await prisma.purchaseOrder.findMany({
        where: { organizationId: org.id },
    });
    if (existingPOs.length === 0) {
        const po = await prisma.purchaseOrder.create({
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
        console.log('✓ Created purchase order draft');
    }
    else {
        console.log('✓ Purchase order already exists');
    }
    // Create automation rule (check if it exists)
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
        console.log('✓ Created automation rule');
    }
    else {
        console.log('✓ Automation rule already exists');
    }
    console.log('\n✓ Seed completed successfully!');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
