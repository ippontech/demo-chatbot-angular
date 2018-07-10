import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayDriverModule } from './driver/driver.module';
import { GatewayClaimModule } from './claim/claim.module';
import { GatewayVehicleModule } from './vehicle/vehicle.module';
import { GatewayInsuranceDetailsModule } from './insurance-details/insurance-details.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayDriverModule,
        GatewayClaimModule,
        GatewayVehicleModule,
        GatewayInsuranceDetailsModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    exports: [
        GatewayVehicleModule
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
