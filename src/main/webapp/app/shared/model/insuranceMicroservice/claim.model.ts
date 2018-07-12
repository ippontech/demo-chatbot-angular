import { Moment } from 'moment';
import { IVehicle } from 'app/shared/model/insuranceMicroservice/vehicle.model';

export interface IClaim {
    id?: number;
    injuryInvolved?: boolean;
    accidentDate?: Moment;
    accidentTime?: Moment;
    accidentCity?: string;
    accidentState?: string;
    passengersInCars?: boolean;
    damageDescription?: string;
    vehicle?: IVehicle;
}

export class Claim implements IClaim {
    constructor(
        public id?: number,
        public injuryInvolved?: boolean,
        public accidentDate?: Moment,
        public accidentTime?: Moment,
        public accidentCity?: string,
        public accidentState?: string,
        public passengersInCars?: boolean,
        public damageDescription?: string,
        public vehicle?: IVehicle
    ) {
        this.injuryInvolved = false;
        this.passengersInCars = false;
    }
}
