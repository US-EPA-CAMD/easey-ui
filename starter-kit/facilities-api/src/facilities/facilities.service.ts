import { Injectable } from '@nestjs/common';

@Injectable()
export class FacilitiesService {
    getFacilities(): string {
        return 'Hello World!';
      }

    getFacilityById(id: number): string {
        return 'Hello World!';
    }
}
