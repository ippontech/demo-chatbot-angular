export interface IInsurancePlan {
    id?: number;
    name?: string;
    summary?: string;
    yearlyPremium?: number;
    deductable?: number;
    coveragePerPerson?: number;
    coveragePerAccident?: number;
}

export class InsurancePlan implements IInsurancePlan {
    constructor(
        public id?: number,
        public name?: string,
        public summary?: string,
        public yearlyPremium?: number,
        public deductable?: number,
        public coveragePerPerson?: number,
        public coveragePerAccident?: number
    ) {}
}
