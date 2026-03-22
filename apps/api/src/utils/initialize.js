"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDemo = initializeDemo;
const prisma_1 = __importDefault(require("../utils/prisma"));
// Get or create demo organization
async function initializeDemo() {
    let org = await prisma_1.default.organization.findFirst({
        where: { slug: 'demo-store' },
    });
    if (!org) {
        org = await prisma_1.default.organization.create({
            data: {
                name: 'Demo Retail Store',
                slug: 'demo-store',
            },
        });
    }
    process.env.DEMO_ORG_ID = org.id;
    console.log('✓ Demo organization initialized:', org.id);
    return org;
}
