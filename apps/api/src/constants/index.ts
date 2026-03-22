export const STOCK_MOVEMENT_TYPES = {
  MANUAL_ADJUSTMENT: 'manual_adjustment',
  TRANSFER: 'transfer',
  PURCHASE_RECEIPT: 'purchase_receipt',
  SALE: 'sale',
  RETURN: 'return',
  DAMAGE: 'damage',
  COUNT_CORRECTION: 'count_correction',
};

export const PO_STATUS = {
  DRAFT: 'draft',
  SENT: 'sent',
  RECEIVED: 'received',
  CANCELLED: 'cancelled',
};

export const ALERT_TYPES = {
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
  HIGH_STOCK: 'high_stock',
  DEAD_STOCK: 'dead_stock',
};

export const ALERT_SEVERITY = {
  INFO: 'info',
  WARNING: 'warning',
  CRITICAL: 'critical',
};

export const ALERT_STATUS = {
  OPEN: 'open',
  ACKNOWLEDGED: 'acknowledged',
  RESOLVED: 'resolved',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
};
