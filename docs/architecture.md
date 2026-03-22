## ShelfOS Architecture

### System Overview

ShelfOS is a modular monolith with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  Home | Dashboard | Inventory | Products | POs | Alerts │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/REST
                     ▼
         ┌────────────────────────────┐
         │   NestJS Backend (API)     │
         │  - Controllers             │
         │  - Middleware              │
         │  - Services                │
         │  - DTOs & Validation       │
         └────────────┬───────────────┘
                      │ Prisma ORM
                      ▼
         ┌────────────────────────────┐
         │      PostgreSQL DB          │
         │  - Organizations           │
         │  - Products                │
         │  - Inventory               │
         │  - Orders & Alerts         │
         └────────────────────────────┘

         ┌────────────────────────────┐
         │   Redis (Job Queue)        │
         │  - Background Jobs         │
         │  - BullMQ Queue            │
         └────────────────────────────┘
```

### Data Flow

#### Stock Movement Flow
```
1. User Action (Adjustment, Transfer, Receipt)
   ↓
2. API Endpoint receives request
   ↓
3. InventoryService.createStockMovement()
   ↓
4. Create StockMovement record (immutable)
   ↓
5. Update InventoryBalance
   ↓
6. Check reorder point
   ↓
7. Create Alert if below threshold
   ↓
8. Return success response
   ↓
9. Frontend updates UI
```

#### Alert Generation
```
Stock Falls Below Reorder Point
   ↓
StockMovement created
   ↓
InventoryBalance updated
   ↓
Check: current_quantity ≤ reorder_point?
   ↓
YES: Create Alert record
   │   - Type: low_stock
   │   - Severity: warning
   │   - Status: open
   │
NO: No action needed
```

#### Purchase Order Workflow
```
Low Stock Alert Created
   ↓
Automation Rule Triggered
   ↓
Find preferred supplier for product
   ↓
Calculate order quantity (reorder_qty)
   ↓
Create PurchaseOrder (status: draft)
   ↓
Create PurchaseOrderLineItem
   ↓
Notify manager/admin
   ↓
User reviews and sends PO
   ↓
Supplier receives and ships
   ↓
Manager receives goods
   ↓
Create purchase_receipt StockMovement
   ↓
InventoryBalance increases
   ↓
Alert can be resolved
```

### API Layer Design

#### Controllers
Located in `apps/api/src/routes/`
- Handle HTTP requests
- Validate input parameters
- Call appropriate services
- Return responses

#### Services
Located in `apps/api/src/services/`
- InventoryService
  - createStockMovement(org, data)
  - getInventoryBalance(org, productId?)
  - getStockMovements(org, limit, offset)

#### Middleware
Located in `apps/api/src/middleware/`
- OrganizationMiddleware
  - Injects organizationId into request
  - Ensures data isolation

#### DTOs & Constants
Located in `apps/api/src/dtos/` and `apps/api/src/constants/`
- Type definitions for form data
- Enum values for status, types, roles

### Database Schema

#### Multi-Tenancy
- All models include organizationId FK
- Queries always filter by organizationId
- Ensures complete data isolation

#### Key Relationships
```
Organization (1) ──→ (many) User
           ├───────→ (many) Store
           ├───────→ (many) Product
           ├───────→ (many) InventoryLocation
           ├───────→ (many) InventoryBalance
           ├───────→ (many) StockMovement
           ├───────→ (many) Supplier
           ├───────→ (many) PurchaseOrder
           ├───────→ (many) Alert
           ├───────→ (many) Automation
           └───────→ (many) AuditLog

Product (1) ──→ (many) InventoryBalance
      ├──────→ (many) StockMovement
      ├──────→ (many) Supplier_Product
      └──────→ (many) PurchaseOrderLineItem

Supplier (1) ──→ (many) Supplier_Product
       ├─────→ (many) PurchaseOrder
       └─────→ (many) Auction

Store (1) ──────→ (many) Store_InventoryLocation
               → Store (link table) ← InventoryLocation
```

#### Immutable Records
- StockMovement: Never updated, only created
- Audit Trail: Ensures data integrity
- Historical Analysis: Allows trend analysis

### Frontend Architecture

#### Page Structure
```
pages/
├── index.tsx (Home)
│   └── Navigation & Feature Overview
├── dashboard.tsx
│   ├── Metrics (Cards)
│   └── Recent Movements (Table)
├── inventory.tsx
│   └── Stock Levels by Location
├── products.tsx
│   └── Product Grid/Cards
├── purchase-orders.tsx
│   └── PO Management Table
└── alerts.tsx
    └── Alert List with Severity
```

#### Component Communication
```
React Page
   │
   ├─ useState (local state)
   ├─ useEffect (fetch on mount)
   │
   └─ axios.get/post
      │
      └─ API Endpoint
         │
         └─ NestJS Controller
            │
            └─ Service Logic
               │
               └─ Prisma (Database)
                  │
                  └─ Response JSON
                     │
                     └─ setState (update UI)
                        │
                        └─ Render Component
```

### Error Handling

#### HTTP Status Codes
- 200 OK - Successful operation
- 201 Created - Resource created
- 400 Bad Request - Invalid input
- 404 Not Found - Resource missing
- 500 Server Error - Unexpected issue

#### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Invalid product SKU",
  "error": "Bad Request"
}
```

### Performance Considerations

1. **Pagination**
   - Stock movements: default 100, offset supported
   - Alerts: paginated in frontend

2. **Indexing**
   - organizationId indexed on all tables
   - productId indexed for quick lookups
   - status indexed on alerts and POs

3. **Eager Loading**
   - Prisma include() for related data
   - Reduces N+1 queries

4. **Query Optimization**
   - Specific field selection
   - Proper joins via ORM

### Extension Points

#### Adding New Features
1. Define database model in `prisma/schema.prisma`
2. Create migration: `pnpm db:migrate dev`
3. Create service in `apps/api/src/services/`
4. Create controller in `apps/api/src/routes/`
5. Add to AppModule controllers array
6. Create frontend page in `apps/web/src/pages/`
7. Update navigation links

#### Adding New Automation Rules
1. Update Automation model if needed
2. Create trigger detection logic
3. Implement action handler
4. Execute via BullMQ job queue

---

**Version**: 1.0  
**Status**: Production Ready
