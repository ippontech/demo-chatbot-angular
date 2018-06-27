import { BaseEntity } from './../../shared';

export class Vehicle implements BaseEntity {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public year?: number,
        public mileage?: number,
        public vin?: string,
        public hasPolicy?: boolean,
        public policyNumber?: number,
        public insurancedetails?: BaseEntity,
        public driver?: BaseEntity,
    ) {
        this.hasPolicy = false;
    }
}
