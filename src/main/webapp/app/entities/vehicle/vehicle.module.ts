import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    VehicleService,
    VehiclePopupService,
    VehicleComponent,
    VehicleDetailComponent,
    VehicleDialogComponent,
    VehiclePopupComponent,
    VehicleDeletePopupComponent,
    VehicleDeleteDialogComponent,
    vehicleRoute,
    vehiclePopupRoute,
} from './';

const ENTITY_STATES = [
    ...vehicleRoute,
    ...vehiclePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    exports: [
        VehicleComponent
    ],
    declarations: [
        VehicleComponent,
        VehicleDetailComponent,
        VehicleDialogComponent,
        VehicleDeleteDialogComponent,
        VehiclePopupComponent,
        VehicleDeletePopupComponent,
    ],
    entryComponents: [
        VehicleComponent,
        VehicleDialogComponent,
        VehiclePopupComponent,
        VehicleDeleteDialogComponent,
        VehicleDeletePopupComponent,
    ],
    providers: [
        VehicleService,
        VehiclePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayVehicleModule {}
