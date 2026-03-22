## ShelfOS Domain Model

This document describes the core domain entities and their relationships.

### Entity: Organization

Root entity for multi-tenancy. All other entities are scoped to an organization.

```typescript
Organization {
  id: String (cuid)
  name: String
  slug: String (unique)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Key Characteristics**:
- Single organization per database instance
- All queries filtered by organizationId
- Enables future multi-tenant features

### Entity: User

User accounts for authentication and authorization.

```typescript
User {
  id: String (cuid)
  email: String (unique)
  name: String
  password: String (hashed)
  role: String (admin | manager | staff)
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Roles**:
- admin: Full system access
- manager: Can approve POs, view reports
- staff: Can create adjustments, view inventory

### Entity: Store

Physical retail locations.

```typescript
Store {
  id: String (cuid)
  name: String
  code: String (unique per org)
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Example**: Main Store, Downtown Location, Warehouse

### Entity: InventoryLocation

Specific areas within or associated with stores where inventory is kept.

```typescript
InventoryLocation {
  id: String (cuid)
  name: String
  code: String (unique per org)
  type: String (store | backroom | warehouse | receiving | virtual)
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Location Types**:
- store: Sales floor
- backroom: Behind-store storage
- warehouse: Central distribution
- receiving: Unloaded goods
- virtual: For adjustments/transfers

### Entity: Product

Items in inventory.

```typescript
Product {
  id: String (cuid)
  sku: String (unique per org)
  name: String
  barcode: String?
  category: String?
  brand: String?
  price: Decimal(10, 2)
  reorderPoint: Int (default: 5)
  reorderQty: Int (default: 10)
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Key Fields**:
- sku: Stock keeping unit (unique identifier)
- reorderPoint: Minimum stock level
- reorderQty: Quantity to order when restocking

### Entity: InventoryBalance

Current stock levels by product and location.

```typescript
InventoryBalance {
  id: String (cuid)
  quantity: Int
  productId: String (FK)
  inventoryLocationId: String (FK)
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
  
  unique: [organizationId, productId, inventoryLocationId]
}
```

**Key Points**:
- One balance per product-location combination
- Updated transactionally with StockMovement
- Never created manually, only updated

**Example**:
```
Product: Blue Widget
Location: Sales Floor
Quantity: 15 units
```

### Entity: StockMovement

Immutable ledger of all inventory changes.

```typescript
StockMovement {
  id: String (cuid)
  type: String (manual_adjustment | transfer | purchase_receipt | sale | return | damage | count_correction)
  quantity: Int (positive or negative)
  notes: String?
  productId: String (FK)
  inventoryLocationId: String (FK) // destination
  fromLocationId: String? (FK) // source location for transfers
  storeId: String? (FK)
  purchaseOrderId: String? (FK) // if from PO
  organizationId: String (FK)
  createdAt: DateTime
  
  indexes: [organizationId, productId, inventoryLocationId, purchaseOrderId]
}
```

**Movement Types**:
- manual_adjustment: Staff corrects inventory
- transfer: Move between locations
- purchase_receipt: Goods received from supplier
- sale: Point of sale (future integration)
- return: Customer/vendor returns
- damage: Damaged goods written off
- count_correction: Cycle count adjustment

**Core Principle**:
> Every inventory change creates an immutable StockMovement record.
> This creates an audit trail and enables historical analysis.

**Example**:
```
Type: purchase_receipt
Quantity: 50
Product: Red Gadget
Location: Receiving zone
Purchase Order: PO-001
```

### Entity: Supplier

Vendors and suppliers.

```typescript
Supplier {
  id: String (cuid)
  name: String
  code: String (unique per org)
  email: String?
  phone: String?
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Entity: Supplier_Product

Relationship between suppliers and products.

```typescript
Supplier_Product {
  id: String (cuid)
  supplierId: String (FK)
  productId: String (FK)
  isPreferred: Boolean (default: false)
  leadDays: Int (default: 7)
  createdAt: DateTime
  
  unique: [supplierId, productId]
}
```

**Key Fields**:
- isPreferred: Used for auto-ordering
- leadDays: Expected delivery time

### Entity: PurchaseOrder

Supplier purchase orders.

```typescript
PurchaseOrder {
  id: String (cuid)
  orderNumber: String (unique per org)
  status: String (draft | sent | received | cancelled)
  supplierId: String (FK - restricted delete)
  totalAmount: Decimal(12, 2)
  sentAt: DateTime?
  receivedAt: DateTime?
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Status Lifecycle**:
```
draft → sent → received
  ↓      ↓        ↓
                cancelled (at any point)
```

### Entity: PurchaseOrderLineItem

Items within a purchase order.

```typescript
PurchaseOrderLineItem {
  id: String (cuid)
  purchaseOrderId: String (FK)
  productId: String (FK)
  quantity: Int
  unitPrice: Decimal(10, 2)
  lineTotal: Decimal(12, 2)
  createdAt: DateTime
}
```

### Entity: Alert

Operational alerts and notifications.

```typescript
Alert {
  id: String (cuid)
  type: String (low_stock | out_of_stock | high_stock | dead_stock)
  severity: String (info | warning | critical)
  status: String (open | acknowledged | resolved)
  productId: String?
  data: String? (JSON)
  message: String
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
  
  indexes: [organizationId, status, severity]
}
```

**Alert Types**:
- low_stock: Below reorder point
- out_of_stock: Zero inventory
- high_stock: Excess inventory (dead stock risk)
- dead_stock: Unchecked for long period

**Severity Levels**:
- info: Informational only
- warning: Should be addressed
- critical: Requires immediate action

**Example**:
```json
{
  "type": "low_stock",
  "severity": "warning",
  "productId": "prod-123",
  "message": "Blue Widget is at 3 units (reorder point: 10)",
  "data": {
    "current": 3,
    "reorderPoint": 10,
    "reorderQty": 25
  }
}
```

### Entity: Automation

Automation rules for event-driven actions.

```typescript
Automation {
  id: String (cuid)
  name: String
  description: String?
  trigger: String (event name)
  condition: String (JSON)
  action: String (JSON)
  enabled: Boolean
  organizationId: String (FK)
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Example Rule**:
```json
{
  "name": "Auto-generate PO on low stock",
  "trigger": "low_stock_alert",
  "condition": {
    "severity": "warning"
  },
  "action": {
    "type": "generate_purchase_order",
    "usePreferredSupplier": true
  }
}
```

### Entity: AuditLog

Track critical changes for compliance.

```typescript
AuditLog {
  id: String (cuid)
  action: String (created | updated | deleted)
  entity: String
  entityId: String
  changes: String? (JSON)
  userId: String?
  organizationId: String (FK)
  createdAt: DateTime
  
  indexes: [organizationId, entity, entityId]
}
```

## Domain Invariants

These are the strict rules that govern the system:

### Invariant 1: Immutable Stock Movements
**Rule**: Every inventory change creates a `StockMovement` record that is never modified.

**Implementation**:
- Only INSERT operations on StockMovement
- Updates only through new StockMovement records (corrections)
- Enables complete audit trail

### Invariant 2: Transactional Balance Updates
**Rule**: `InventoryBalance` must update transactionally with `StockMovement`.

**Implementation**:
- Database transactions wrap both operations
- Ensures consistency
- Prevents orphaned records

### Invariant 3: Multi-Tenancy Isolation
**Rule**: All business data is scoped by `organizationId`.

**Implementation**:
- Every query filters by organizationId
- Unique constraints include organizationId
- Prevents cross-organization data leaks

### Invariant 4: Purchase Order Receipts
**Rule**: Purchase order receipts create `purchase_receipt` StockMovement records.

**Implementation**:
- Link via purchaseOrderId in StockMovement
- Automatic InventoryBalance update
- Fulfills order tracking requirement

### Invariant 5: Event-Driven Alerts and Automations
**Rule**: Alerts and automations are triggered by domain events.

**Implementation**:
- Alert creation on inventory threshold breach
- Automation rule evaluation on specific events
- Enables proactive operations

### Invariant 6: Critical Mutation Audit Logging
**Rule**: Critical mutations are recorded in AuditLog.

**Implementation**:
- Large adjustments logged
- PO state changes logged
- User-initiated changes logged
- Enables compliance and debugging

## Domain Queries

Common queries and their business intent:

### Low Stock Identification
```sql
SELECT p.*, ib.quantity 
FROM Product p
JOIN InventoryBalance ib ON p.id = ib.productId
WHERE ib.organizationId = $1
  AND ib.quantity <= p.reorderPoint
```

### Recent Activity
```sql
SELECT * FROM StockMovement
WHERE organizationId = $1
ORDER BY createdAt DESC
LIMIT 50
```

### Open Purchase Orders
```sql
SELECT * FROM PurchaseOrder
WHERE organizationId = $1
  AND status IN ('draft', 'sent')
ORDER BY createdAt DESC
```

### Inventory Value
```sql
SELECT SUM(ib.quantity * p.price) as value
FROM InventoryBalance ib
JOIN Product p ON ib.productId = p.id
WHERE ib.organizationId = $1
```

## Future Enhancements

Ready for expansion in these areas:
- Sales order integration
- Barcode scanning + movement recording
- Supplier performance metrics
- Demand forecasting with ML
- Multi-warehouse transfers
- Adjustment approvals (workflow)
- Historical cost tracking
- Inventory aging reports
- Dead stock identification
- Seasonal forecasting

---

**Version**: 1.0  
**Status**: Stable
