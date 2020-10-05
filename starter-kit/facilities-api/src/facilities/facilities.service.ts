import { Injectable } from '@nestjs/common';

@Injectable()
export class FacilitiesService {
  getFacilities(): string {
    return 'Hello World!';
  }

  getFacilityById(id: number): string {
    return 'Hello World!';
  }

  getFacilityContact(id: number): string {
    return 'Hello World!';
  }

  getFacilityMonitoringPlan(id: number): string {
    return 'Hello World!';
  }
}
