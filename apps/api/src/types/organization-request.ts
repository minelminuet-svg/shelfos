import { Request } from 'express';

export interface OrganizationRequest extends Request {
  organizationId: string;
}
