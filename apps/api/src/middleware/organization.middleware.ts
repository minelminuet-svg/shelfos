import { InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { OrganizationRequest } from '../types/organization-request';

export class OrganizationMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const organizationHeader = req.headers['x-organization-id'];
    const organizationId = Array.isArray(organizationHeader)
      ? organizationHeader[0]
      : organizationHeader ?? process.env.DEMO_ORG_ID;

    if (!organizationId) {
      throw new InternalServerErrorException('Organization context is not initialized.');
    }

    (req as OrganizationRequest).organizationId = organizationId;
    next();
  }
}
