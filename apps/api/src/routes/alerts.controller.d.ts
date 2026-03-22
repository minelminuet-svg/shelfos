export declare class AlertsController {
    private controller;
    getAlerts(req: any): Promise<{
        id: string;
        type: string;
        severity: string;
        status: string;
        productId: string | null;
        organizationId: string;
        message: string;
        data: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getOpenAlerts(req: any): Promise<{
        id: string;
        type: string;
        severity: string;
        status: string;
        productId: string | null;
        organizationId: string;
        message: string;
        data: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateStatus(id: string, body: any, req: any): Promise<any>;
}
