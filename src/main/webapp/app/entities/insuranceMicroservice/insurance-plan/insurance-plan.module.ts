import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    InsurancePlanComponent,
    InsurancePlanDetailComponent,
    InsurancePlanUpdateComponent,
    InsurancePlanDeletePopupComponent,
    InsurancePlanDeleteDialogComponent,
    insurancePlanRoute,
    insurancePlanPopupRoute
} from './';

const ENTITY_STATES = [...insurancePlanRoute, ...insurancePlanPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InsurancePlanComponent,
        InsurancePlanDetailComponent,
        InsurancePlanUpdateComponent,
        InsurancePlanDeleteDialogComponent,
        InsurancePlanDeletePopupComponent
    ],
    entryComponents: [
        InsurancePlanComponent,
        InsurancePlanUpdateComponent,
        InsurancePlanDeleteDialogComponent,
        InsurancePlanDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayInsurancePlanModule {}
