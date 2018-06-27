import { BaseEntity } from './../../shared';

export const enum InsuranceType {
    'NONE',
    'STATEMINIMUM',
    'LIABILITY',
    'COMPREHENSIVE'
}

export class InsuranceDetails implements BaseEntity {
    constructor(
        public id?: number,
        public level?: InsuranceType,
        public annualPremium?: number,
        public injuryLiability?: boolean,
        public propertyLiability?: boolean,
        public uninsuredMotoristInjury?: boolean,
        public uninsuredMotoristProperty?: boolean,
    ) {
        this.injuryLiability = false;
        this.propertyLiability = false;
        this.uninsuredMotoristInjury = false;
        this.uninsuredMotoristProperty = false;
    }
}
