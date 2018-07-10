import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent } from './';

import { GatewayEntityModule } from '../entities/entity.module';

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild([ HOME_ROUTE ]),
        GatewayEntityModule
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayHomeModule {}
