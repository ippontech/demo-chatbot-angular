import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';
import { InsurancePlanService } from './insurance-plan.service';
import { InsurancePlanComponent } from './insurance-plan.component';
import { InsurancePlanDetailComponent } from './insurance-plan-detail.component';
import { InsurancePlanUpdateComponent } from './insurance-plan-update.component';
import { InsurancePlanDeletePopupComponent } from './insurance-plan-delete-dialog.component';
import { IInsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';

@Injectable({ providedIn: 'root' })
export class InsurancePlanResolve implements Resolve<IInsurancePlan> {
    constructor(private service: InsurancePlanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((insurancePlan: HttpResponse<InsurancePlan>) => insurancePlan.body));
        }
        return of(new InsurancePlan());
    }
}

export const insurancePlanRoute: Routes = [
    {
        path: 'insurance-plan',
        component: InsurancePlanComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsurancePlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'insurance-plan/:id/view',
        component: InsurancePlanDetailComponent,
        resolve: {
            insurancePlan: InsurancePlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsurancePlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'insurance-plan/new',
        component: InsurancePlanUpdateComponent,
        resolve: {
            insurancePlan: InsurancePlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsurancePlans'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'insurance-plan/:id/edit',
        component: InsurancePlanUpdateComponent,
        resolve: {
            insurancePlan: InsurancePlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsurancePlans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const insurancePlanPopupRoute: Routes = [
    {
        path: 'insurance-plan/:id/delete',
        component: InsurancePlanDeletePopupComponent,
        resolve: {
            insurancePlan: InsurancePlanResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'InsurancePlans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
