import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    DriverService,
    DriverPopupService,
    DriverComponent,
    DriverDetailComponent,
    DriverDialogComponent,
    DriverPopupComponent,
    DriverDeletePopupComponent,
    DriverDeleteDialogComponent,
    driverRoute,
    driverPopupRoute,
} from './';

const ENTITY_STATES = [
    ...driverRoute,
    ...driverPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DriverComponent,
        DriverDetailComponent,
        DriverDialogComponent,
        DriverDeleteDialogComponent,
        DriverPopupComponent,
        DriverDeletePopupComponent,
    ],
    entryComponents: [
        DriverComponent,
        DriverDialogComponent,
        DriverPopupComponent,
        DriverDeleteDialogComponent,
        DriverDeletePopupComponent,
    ],
    providers: [
        DriverService,
        DriverPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayDriverModule {}
