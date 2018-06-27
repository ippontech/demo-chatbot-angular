import { Route } from '@angular/router';

import { HomeComponent } from './';
import { InsuranceDetailsComponent } from './../entities/insurance-details';

export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    data: {
        authorities: [],
        pageTitle: 'Ippon Insurance'
    }
};

export const insuranceDetailsRoute: Route = {
    path: '',
    component: InsuranceDetailsComponent,
    data: {
        authorities: [],
        pageTitle: 'InsuranceDetails'
    }
};
