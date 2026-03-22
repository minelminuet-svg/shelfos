# ShelfOS - Retail Operations Automation Platform

A complete, functional retail automation system for small-to-mid retail businesses. Includes inventory management, purchase orders, low-stock alerts, and operational dashboards.

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

### Pages Available
1. **Home** (`/`) - Welcome page with navigation
2. **Dashboard** (`/dashboard`) - Key metrics and recent movements
3. **Inventory** (`/inventory`) - Current stock levels with status
4. **Products** (`/products`) - Complete product catalog
5. **Purchase Orders** (`/purchase-orders`) - PO management and tracking
6. **Alerts** (`/alerts`) - Low-stock and operational alerts

### API Endpoints
- `GET/POST /api/products` - Product management
- `GET/POST /api/suppliers` - Supplier management
- `GET/POST /api/purchase-orders` - Purchase order operations
- `GET/POST /api/inventory/movements` - Stock movement tracking
- `GET /api/inventory/balances` - Current inventory balances
- `GET /api/alerts` - Alert retrieval and management
- `GET /api/dashboard/*` - Dashboard metrics and data

## 🚀 Quick Start

### Prerequisites
- Docker Desktop (for PostgreSQL and Redis)
- Node.js 20+
- PNPM

### Installation & Setup

```bash
# 1. Install dependencies (already done)
pnpm install

# 2. Start Docker services
docker compose up -d postgres redis

# 3. Environment is configured

# 4. Initialize database
pnpm db:generate  # Generate Prisma client
pnpm db:migrate   # Run migrations
pnpm db:seed      # Seed demo data

# 5. Start development servers
pnpm dev:api      # Terminal 1
pnpm dev:web      # Terminal 2
```

### Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api
- **Database**: `postgresql://postgres:postgres@localhost:5432/shelfos`

## 📊 Demo Data

The database is pre-seeded with realistic demo data:

### Organization
- **Name**: Demo Retail Store
- **Slug**: demo-store

### Products (2)
1. **Blue Widget** (SKU: WIDGET-001)
   - Price: $29.99
   - Reorder Point: 10 units
   - Stock: 20 backroom + 15 floor = 35 total

2. **Red Gadget** (SKU: GADGET-001) ⚠️ LOW STOCK
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
