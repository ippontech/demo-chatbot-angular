import { BaseEntity } from './../../shared';

export class Claim implements BaseEntity {
    constructor(
        public id?: number,
        public injuryInvolved?: boolean,
        public accidentDate?: any,
        public accidentTime?: any,
        public accidentCity?: string,
        public accidentState?: string,
        public passengersInCars?: boolean,
        public damageLocation?: string,
        public driver?: BaseEntity,
        public vehicle?: BaseEntity,
    ) {
        this.injuryInvolved = false;
        this.passengersInCars = false;
    }
}
