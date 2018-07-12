import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayDriverModule as InsuranceMicroserviceDriverModule } from './insuranceMicroservice/driver/driver.module';
import { GatewayVehicleModule as InsuranceMicroserviceVehicleModule } from './insuranceMicroservice/vehicle/vehicle.module';
import { GatewayInsurancePlanModule as InsuranceMicroserviceInsurancePlanModule } from './insuranceMicroservice/insurance-plan/insurance-plan.module';
import { GatewayClaimModule as InsuranceMicroserviceClaimModule } from './insuranceMicroservice/claim/claim.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        InsuranceMicroserviceDriverModule,
        InsuranceMicroserviceVehicleModule,
        InsuranceMicroserviceInsurancePlanModule,
        InsuranceMicroserviceClaimModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
