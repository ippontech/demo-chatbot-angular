import { IClaim } from 'app/shared/model/insuranceMicroservice/claim.model';
import { IDriver } from 'app/shared/model/insuranceMicroservice/driver.model';

export interface IVehicle {
    id?: number;
    make?: string;
    model?: string;
    year?: number;
    mileage?: number;
    vin?: string;
    insuranceId?: number;
    claims?: IClaim[];
    driver?: IDriver;
}

export class Vehicle implements IVehicle {
    constructor(
        public id?: number,
        public make?: string,
        public model?: string,
        public year?: number,
        public mileage?: number,
        public vin?: string,
        public insuranceId?: number,
        public claims?: IClaim[],
        public driver?: IDriver
    ) {}
}
