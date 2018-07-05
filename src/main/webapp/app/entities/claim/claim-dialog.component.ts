import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Claim } from './claim.model';
import { ClaimPopupService } from './claim-popup.service';
import { ClaimService } from './claim.service';
import { Driver, DriverService } from '../driver';
import { Vehicle, VehicleService } from '../vehicle';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-claim-dialog',
    templateUrl: './claim-dialog.component.html'
})
export class ClaimDialogComponent implements OnInit {

    claim: Claim;
    isSaving: boolean;

    drivers: Driver[];
    currentAccount: any;

    vehicles: Vehicle[];
    accidentDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private claimService: ClaimService,
        private driverService: DriverService,
        private vehicleService: VehicleService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.isSaving = false;
        this.driverService.query()
            .subscribe((res: HttpResponse<Driver[]>) => { this.drivers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.vehicleService
            .query({filter: 'claim-is-null'})
            .subscribe((res: HttpResponse<Vehicle[]>) => {
                if (!this.claim.vehicle || !this.claim.vehicle.id) {
                    this.vehicles = res.body;
                } else {
                    this.vehicleService
                        .find(this.claim.vehicle.id)
                        .subscribe((subRes: HttpResponse<Vehicle>) => {
                            this.vehicles = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.claim.id !== undefined) {
            this.subscribeToSaveResponse(
                this.claimService.update(this.claim));
        } else {
            this.subscribeToSaveResponse(
                this.claimService.create(this.claim));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Claim>>) {
        result.subscribe((res: HttpResponse<Claim>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Claim) {
        this.eventManager.broadcast({ name: 'claimListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDriverById(index: number, item: Driver) {
        return item.id;
    }

    trackVehicleById(index: number, item: Vehicle) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-claim-popup',
    template: ''
})
export class ClaimPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private claimPopupService: ClaimPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.claimPopupService
                    .open(ClaimDialogComponent as Component, params['id']);
            } else {
                this.claimPopupService
                    .open(ClaimDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
