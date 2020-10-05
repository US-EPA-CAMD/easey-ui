import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

import {
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  Controller,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { FacilitiesService } from './facilities.service';

@ApiTags('Facilities')
@Controller('facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get All Facilities',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Resource Not Found',
  })
  getFacilities(): string {
    // will need a query param
    return this.facilitiesService.getFacilities();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Facilitiy Retrieved By ID',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Request',
  })
  @ApiNotFoundResponse({
    description: 'Facility ID Not Found',
  })
  getFacilityById(@Param('id', ParseIntPipe) id: number): string {
    return this.facilitiesService.getFacilityById(id);
  }

  @Get('/:id/contacts')
  @ApiOkResponse({
    description: 'Retrieved contact data of the specified facility.',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'A facility with the specificed ID was not found.',
  })
  getFacilityContact(@Param('id', ParseIntPipe) id: number): string {
    return this.facilitiesService.getFacilityContact(id);
  }

  @Get('/:id/monitoring-plans')
  @ApiOkResponse({
    description: 'Retrieved all monitoring plans of the specified facility.',
  })
  @ApiBadRequestResponse({
    description: 'The specified facility ID is invalid.',
  })
  @ApiNotFoundResponse({
    description: 'A facility with the specificed ID was not found.',
  })
  getFacilityMonitoringPlan(@Param('id', ParseIntPipe) id: number): string {
    // will need a query param
    return this.facilitiesService.getFacilityMonitoringPlan(id);
  }
}
