import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Claim } from 'app/shared/model/insuranceMicroservice/claim.model';
import { ClaimService } from './claim.service';
import { ClaimComponent } from './claim.component';
import { ClaimDetailComponent } from './claim-detail.component';
import { ClaimUpdateComponent } from './claim-update.component';
import { ClaimDeletePopupComponent } from './claim-delete-dialog.component';
import { IClaim } from 'app/shared/model/insuranceMicroservice/claim.model';
import { IVehicle, Vehicle } from 'app/shared/model/insuranceMicroservice/vehicle.model';
import { VehicleService } from 'app/entities/insuranceMicroservice/vehicle';

@Injectable({ providedIn: 'root' })
export class ClaimResolve implements Resolve<IClaim> {
    constructor(private service: ClaimService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((claim: HttpResponse<Claim>) => claim.body));
        }
        return of(new Claim());
    }
}
@Injectable({ providedIn: 'root' })
export class VehicleResolve implements Resolve<IVehicle> {
    constructor(private service: VehicleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['vehicleId'] ? route.params['vehicleId'] : null;
        console.log('Vehicle Id about to be store in claim:', id);
        if (id) {
            return this.service.find(id).pipe(map((vehicle: HttpResponse<Vehicle>) => vehicle.body));
        }
    }
}

export const claimRoute: Routes = [
    {
        path: 'claim',
        component: ClaimComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Claims'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'claim/:id/view',
        component: ClaimDetailComponent,
        resolve: {
            claim: ClaimResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Claims'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'claim/:vehicleId/new',
        component: ClaimUpdateComponent,
        resolve: {
            claim: ClaimResolve,
            vehicle: VehicleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Claims'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'claim/:id/edit',
        component: ClaimUpdateComponent,
        resolve: {
            claim: ClaimResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Claims'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const claimPopupRoute: Routes = [
    {
        path: 'claim/:id/delete',
        component: ClaimDeletePopupComponent,
        resolve: {
            claim: ClaimResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Claims'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
