import { Body, Controller, Get, Param, Put, Req } from '@nestjs/common';
import { AlertController } from '../controllers';
import { UpdateAlertStatusDto } from '../dtos';
import { OrganizationRequest } from '../types/organization-request';

@Controller('alerts')
export class AlertsController {
  private controller = new AlertController();

  @Get()
  async getAlerts(@Req() req: OrganizationRequest) {
    return this.controller.getAlerts(req.organizationId);
  }

  @Get('open')
  async getOpenAlerts(@Req() req: OrganizationRequest) {
    return this.controller.getAlerts(req.organizationId, 'open');
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateAlertStatusDto,
    @Req() req: OrganizationRequest,
  ) {
    return this.controller.updateAlertStatus(req.organizationId, id, body);
  }
}
