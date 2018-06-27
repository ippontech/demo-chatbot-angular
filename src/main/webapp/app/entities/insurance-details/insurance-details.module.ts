import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    InsuranceDetailsService,
    InsuranceDetailsPopupService,
    InsuranceDetailsComponent,
    InsuranceDetailsDetailComponent,
    InsuranceDetailsDialogComponent,
    InsuranceDetailsPopupComponent,
    InsuranceDetailsDeletePopupComponent,
    InsuranceDetailsDeleteDialogComponent,
    insuranceDetailsRoute,
    insuranceDetailsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...insuranceDetailsRoute,
    ...insuranceDetailsPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        InsuranceDetailsComponent,
        InsuranceDetailsDetailComponent,
        InsuranceDetailsDialogComponent,
        InsuranceDetailsDeleteDialogComponent,
        InsuranceDetailsPopupComponent,
        InsuranceDetailsDeletePopupComponent,
    ],
    entryComponents: [
        InsuranceDetailsComponent,
        InsuranceDetailsDialogComponent,
        InsuranceDetailsPopupComponent,
        InsuranceDetailsDeleteDialogComponent,
        InsuranceDetailsDeletePopupComponent,
    ],
    providers: [
        InsuranceDetailsService,
        InsuranceDetailsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayInsuranceDetailsModule {}
