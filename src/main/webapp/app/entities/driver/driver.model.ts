import { BaseEntity } from './../../shared';

export class Driver implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public birthDate?: any,
        public licenseDate?: any,
        public pastAccident?: number,
        public zipCode?: number,
        public disable?: boolean,
        public maritalStatus?: boolean,
        public ownsHome?: boolean,
        public militaryService?: boolean,
        public userLogin?: string,
        public claims?: BaseEntity[],
        public vehicles?: BaseEntity[],
    ) {
        this.disable = false;
        this.maritalStatus = false;
        this.ownsHome = false;
        this.militaryService = false;
    }
}
