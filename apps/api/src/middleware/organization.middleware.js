"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationMiddleware = void 0;
class OrganizationMiddleware {
    use(req, res, next) {
        // For demo purposes, use a hardcoded organization ID
        // In production, this would come from JWT token
        req.organizationId = process.env.DEMO_ORG_ID || '1';
        next();
    }
}
exports.OrganizationMiddleware = OrganizationMiddleware;
