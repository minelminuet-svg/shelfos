# ShelfOS - Retail Operations Automation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)

A complete, production-ready retail automation system for small-to-mid retail businesses. Includes inventory management, purchase order management, real-time low-stock alerts, and operational dashboards with professional UI/UX.

## 📋 Project Overview

ShelfOS is a **full-stack monorepo project** that demonstrates:
- Enterprise-grade backend API with NestJS
- Modern frontend with Next.js and React
- Multi-tenant architecture for scalability
- Professional UI with Tailwind CSS and glassmorphism
- Docker containerization for infrastructure
- Complete data persistence with PostgreSQL and Prisma ORM

## 🎯 Features Implemented

### ✅ Complete
- **Multi-Tenancy**: Fully isolated organization support
- **Inventory Management**: Track stock across multiple locations
- **Stock Movement Ledger**: Immutable history of all inventory changes
- **Product Catalog**: Complete product database with pricing and reorder points
- **Supplier Management**: Supplier relationships and product connections
- **Purchase Orders**: Create, manage, and receive purchase orders
- **Low-Stock Alerts**: Automatic alerts when inventory falls below reorder points
- **Dashboard**: Real-time visibility into key metrics
- **Frontend Pages**: 5 fully functional pages with data integration
- **API Endpoints**: Complete REST API for all core features
- **Database**: PostgreSQL with Prisma ORM and seeds

## 🏗️ Project Structure

```
joc_snake/
├── apps/
│   ├── api/                    # NestJS backend server
│   │   ├── src/
│   │   │   ├── controllers/    # API route handlers (6 files)
│   │   │   ├── services/       # Business logic layer
│   │   │   ├── middleware/     # Multi-tenancy, guards
│   │   │   └── main.ts         # Express bootstrapper
│   │   └── package.json
│   │
│   └── web/                    # Next.js frontend application
│       ├── src/
│       │   ├── pages/          # 6 React pages with data integration
│       │   ├── components/     # Shared UI components (AppShell, states.tsx)
│       │   └── lib/            # API utilities, helpers
│       └── package.json
│
├── packages/
│   ├── config/                 # Shared TypeScript & ESLint configs
│   ├── db/                     # Prisma ORM with schema
│   │   ├── prisma/
│   │   │   ├── schema.prisma   # 13 database entities
│   │   │   └── migrations/     # Database version control
│   │   └── seed.ts             # Idempotent demo data
│   └── types/                  # Shared TypeScript interfaces
│
├── docs/                        # Documentation
├── docker-compose.yml           # PostgreSQL + Redis services
├── pnpm-workspace.yaml          # Monorepo configuration
└── package.json                 # Root workspace manifest
```

## 💻 Tech Stack

### Frontend
- **Next.js** 14 - React framework with file-based routing
- **React** 18 - UI library with hooks
- **TypeScript** 5 - Type-safe JavaScript
- **Tailwind CSS** 3 - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend
- **NestJS** 10 - Progressive Node.js framework
- **Express** 4 - Underlying HTTP server
- **TypeScript** 5 - Full type safety
- **Prisma** 5.7 - Type-safe ORM

### Database & Cache
- **PostgreSQL** 16 - Relational database
- **Redis** 7 - In-memory cache/queue
- **Prisma Client** - Query builder & migration tool

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **PNPM** - Fast, disk-efficient package manager

## 🎨 UI/UX Features

- **Dark Theme** - Professional slate and emerald color scheme
- **Glassmorphism** - Backdrop blur effects for depth
- **Responsive Design** - Mobile-friendly layouts
- **Hover Effects** - Interactive feedback with scale and shadow
- **Color-Coded Status** - Visual indicators (success/warning/danger)
- **Professional Typography** - Consistent font hierarchy
- **Icon Indicators** - Emoji-based quick recognition

## 📦 Database Schema

13 entities with full relationships:
- **Organizations** - Multi-tenancy root
- **Products** - Catalog with pricing
- **Suppliers** - Vendor management
- **InventoryBalances** - Current stock tracking
- **InventoryMovements** - Immutable transaction log
- **PurchaseOrders** - Purchase workflow
- **PurchaseOrderLineItems** - Order details
- **Locations** - Physical storage locations
- **Alerts** - System notifications
- **AutomationRules** - Business logic triggers
- **AuditLogs** - Change tracking
- **StockMovementTypes** - Transaction classification
- **Organizations** - Tenant isolation

## 🚀 Getting Started

### Prerequisites
- **Docker Desktop** (PostgreSQL 16 & Redis 7)
- **Node.js** 20+ ([download](https://nodejs.org/))
- **PNPM** 9+ (`npm install -g pnpm`)

### Step 1: Clone & Install

```bash
git clone https://github.com/minelminuet-svg/shelfos.git
cd shelfos
pnpm install
```

### Step 2: Start Infrastructure

```bash
docker compose up -d
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379

### Step 3: Database Setup

```bash
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run migrations
pnpm db:seed      # Load demo data
```

### Step 4: Start Development Servers

**Terminal 1 - Backend API:**
```bash
cd apps/api
pnpm start
```
Runs on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd apps/web
pnpm dev
```
Runs on `http://localhost:3000`

### Verify Installation

1. **Frontend**: Open http://localhost:3000 in browser
2. **API**: Test http://localhost:3001/api/dashboard/summary
3. **Database**: PostgreSQL should be accessible on port 5432

## 📊 Demo Data

Pre-seeded data includes:

### Organization
- **Name**: Demo Retail Store
- **ID**: demo-store

### Products (2)
1. **Blue Widget** (SKU: WIDGET-001)
   - Price: $29.99
   - Stock: 35 units
   
2. **Red Gadget** (SKU: GADGET-001)
   - Price: $49.99
   - Stock: 3 units (⚠️ below reorder point of 10)

### Alerts
- Low-stock warning for Red Gadget
- Triggered automatically when inventory < reorder point

## 🔌 API Endpoints

All endpoints are scoped to `demo-store` organization:

### Dashboard
- `GET /api/dashboard/summary` - Key metrics
- `GET /api/dashboard/recent-movements` - Latest 10 stock movements

### Products
- `GET /api/products` - All products
- `POST /api/products` - Create product

### Inventory
- `GET /api/inventory/balances` - Current stock by location
- `POST /api/inventory/movements` - Record stock movement

### Purchase Orders
- `GET /api/purchase-orders` - All orders
- `POST /api/purchase-orders` - Create order

### Suppliers
- `GET /api/suppliers` - All suppliers
- `POST /api/suppliers` - Create supplier

### Alerts
- `GET /api/alerts` - All alerts
- `PUT /api/alerts/:id/status` - Update alert status

## 🖥️ Frontend Pages

1. **Home** (`/`)
   - Welcome screen
   - Feature cards linking to main sections
   - Professional branding

2. **Dashboard** (`/dashboard`)
   - 4 metric cards with icons and status
   - Recent stock movements table
   - Real-time data from API

3. **Inventory** (`/inventory`)
   - Stock levels by location
   - Color-coded status (healthy/low)
   - Reorder point indicators

4. **Products** (`/products`)
   - Product grid layout
   - Price, SKU, and reorder info
   - Hover effects

5. **Purchase Orders** (`/purchase-orders`)
   - Order list with supplier info
   - Status tracking (draft/sent/received)
   - Line item counts and totals

6. **Alerts** (`/alerts`)
   - All system alerts
   - Severity-based styling (critical/warning/info)
   - Created timestamp
   - Price: $49.99
   - Reorder Point: 5 units
   - Stock: 3 units (below reorder point)

### Supplier
- **Name**: Wholesale Supplier Inc
- **Code**: SUP-001
- **Products**: Both products available

### Inventory Locations (2)
- Backroom
- Sales Floor

### Demo Workflow
1. ✓ Red Gadget shows 3 units in stock
2. ✓ Low-stock alert automatically created
3. ✓ Purchase order draft generated for preferred supplier
4. ✓ Stock movement history recorded

## 🔄 Complete Workflow

### View Low Stock Alerts
```
1. Navigate to http://localhost:3000/alerts
2. See "Red Gadget" low stock warning
3. Alert type: LOW_STOCK
4. Severity: WARNING
5. Status: OPEN
```

### Check Dashboard
```
1. Navigate to http://localhost:3000/dashboard
2. View Key Metrics:
   - Low Stock Alerts: 1
   - Open POs: 1 (draft)
   - Total Products: 2
   - Inventory Value: ~$1,589.65
3. See Recent Movements
```

### Manage Inventory
```
1. Navigate to http://localhost:3000/inventory
2. View current stock by location
3. See reorder points and status
4. Identify low stock items
```

### Check Purchase Orders
```
1. Navigate to http://localhost:3000/purchase-orders
2. View PO-[timestamp] draft
3. See which items are ordered
4. Check supplier and total amount
```

## 📝 API Usage Examples

### Get Dashboard Summary
```bash
curl http://localhost:3001/api/dashboard/summary
```

### Get Current Inventory Balances
```bash  
curl http://localhost:3001/api/inventory/balances
```

### Get Recent Stock Movements
```bash
curl http://localhost:3001/api/inventory/movements
```

### Get All Alerts
```bash
curl http://localhost:3001/api/alerts
```

### Get Products
```bash
curl http://localhost:3001/api/products
```

### Get Purchase Orders
```bash
curl http://localhost:3001/api/purchase-orders
```

## 🛠️ Available Commands

```bash
# Development
pnpm dev           # Start both API and web servers
pnpm dev:api       # Start only API server
pnpm dev:web       # Start only web server

# Database
pnpm db:generate   # Generate Prisma client
pnpm db:migrate    # Run migrations in dev mode
pnpm db:migrate:deploy  # Deploy migrations (prod)
pnpm db:seed       # Seed demo data
pnpm db:studio     # Open Prisma Studio GUI

# Production
pnpm build         # Build all packages
```

## 📁 Project Structure

```
shelfos/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── routes/        # API controllers
│   │   │   ├── controllers/   # Business logic
│   │   │   ├── services/      # Services
│   │   │   ├── middleware/    # Request middleware
│   │   │   ├── utils/         # Utilities
│   │   │   ├── constants/     # Constants
│   │   │   ├── dtos/          # Data transfer objects
│   │   │   └── main.ts        # Entry point
│   │   └── package.json
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   └── pages/         # React pages
│       │       ├── index.tsx   # Home
│       │       ├── dashboard.tsx
│       │       ├── inventory.tsx
│       │       ├── products.tsx
│       │       ├── purchase-orders.tsx
│       │       └── alerts.tsx
│       └── package.json
├── packages/                   # Shared packages
│   ├── types/                 # Shared types
│   ├── ui/                    # Shared components
│   ├── config/                # Configuration
│   └── workflow-engine/       # Automation engine
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Seeding script
│   └── migrations/            # Migration history
├── docker-compose.yml         # Docker services
├── .env                       # Environment variables
└── README.md
```

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Axios
- **Backend**: NestJS, TypeScript, Express
- **Database**: PostgreSQL 16, Prisma ORM
- **Job Queue**: Redis, BullMQ
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces

### Core Domain Model
1. **Organization** - Multi-tenancy root
2. **Product** - Items for sale
3. **Store** - Physical retail locations
4. **InventoryLocation** - Specific areas (backroom, floor, warehouse)
5. **InventoryBalance** - Current stock by product & location
6. **StockMovement** - Immutable history of all changes
7. **Supplier** - Vendor management
8. **PurchaseOrder** - Order tracking
9. **Alert** - Operational notifications

### Key Rules
- Every inventory change creates a StockMovement record
- InventoryBalance updates transactionally with StockMovement
- All data is scoped by organizationId
- Low-stock alerts auto-trigger when inventory ≤ reorder point

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check Docker is running
docker compose ps

# Start services if stopped
docker compose up -d postgres redis

# Test connection
PGPASSWORD=postgres psql -h localhost -U postgres -d shelfos -c "SELECT 1"
```

### Port Already in Use
```bash
# API (3001)
lsof -i :3001 | grep -v PID | awk '{print $2}' | xargs kill -9

# Web (3000)
lsof -i :3000 | grep -v PID | awk '{print $2}' | xargs kill -9
```

### Missing Dependencies
```bash
pnpm install          # Reinstall all dependencies
pnpm store prune      # Clear pnpm cache
```

## 📞 Support

For issues or questions:
1. Check the `/docs` directory for detailed documentation
2. Review API responses for error details
3. Check browser console for frontend errors
4. Check API logs in terminal for backend errors

## 📄 License

MIT License - See LICENSE file for details

---

**ShelfOS v1.0** - Ready for Production! 🎉
