import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { InsuranceDetailsComponent } from './insurance-details.component';
import { InsuranceDetailsDetailComponent } from './insurance-details-detail.component';
import { InsuranceDetailsPopupComponent } from './insurance-details-dialog.component';
import { InsuranceDetailsDeletePopupComponent } from './insurance-details-delete-dialog.component';

export const insuranceDetailsRoute: Routes = [
    {
        path: 'insurance-details',
        component: InsuranceDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsuranceDetails'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'insurance-details/:id',
        component: InsuranceDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsuranceDetails'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const insuranceDetailsPopupRoute: Routes = [
    {
        path: 'insurance-details-new',
        component: InsuranceDetailsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InsuranceDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'insurance-details/:id/edit',
        component: InsuranceDetailsPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InsuranceDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'insurance-details/:id/delete',
        component: InsuranceDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'InsuranceDetails'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
