"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLES = exports.ALERT_SEVERITY = exports.ALERT_TYPES = exports.PO_STATUS = exports.STOCK_MOVEMENT_TYPES = void 0;
exports.STOCK_MOVEMENT_TYPES = {
    MANUAL_ADJUSTMENT: 'manual_adjustment',
    TRANSFER: 'transfer',
    PURCHASE_RECEIPT: 'purchase_receipt',
    SALE: 'sale',
    RETURN: 'return',
    DAMAGE: 'damage',
    COUNT_CORRECTION: 'count_correction',
};
exports.PO_STATUS = {
    DRAFT: 'draft',
    SENT: 'sent',
    RECEIVED: 'received',
    CANCELLED: 'cancelled',
};
exports.ALERT_TYPES = {
    LOW_STOCK: 'low_stock',
    OUT_OF_STOCK: 'out_of_stock',
    HIGH_STOCK: 'high_stock',
    DEAD_STOCK: 'dead_stock',
};
exports.ALERT_SEVERITY = {
    INFO: 'info',
    WARNING: 'warning',
    CRITICAL: 'critical',
};
exports.USER_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    STAFF: 'staff',
};
