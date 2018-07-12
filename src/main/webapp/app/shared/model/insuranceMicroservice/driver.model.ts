import { Moment } from 'moment';
import { IVehicle } from 'app/shared/model/insuranceMicroservice/vehicle.model';

export interface IDriver {
    id?: number;
    userLogin?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: Moment;
    licenseDate?: Moment;
    pastAccident?: number;
    zipCode?: number;
    vehicles?: IVehicle[];
}

export class Driver implements IDriver {
    constructor(
        public id?: number,
        public userLogin?: string,
        public firstName?: string,
        public lastName?: string,
        public birthDate?: Moment,
        public licenseDate?: Moment,
        public pastAccident?: number,
        public zipCode?: number,
        public vehicles?: IVehicle[]
    ) {}
}
