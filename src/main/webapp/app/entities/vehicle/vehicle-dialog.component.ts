import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vehicle } from './vehicle.model';
import { VehiclePopupService } from './vehicle-popup.service';
import { VehicleService } from './vehicle.service';
import { InsuranceDetails, InsuranceDetailsService } from '../insurance-details';
import { Driver, DriverService } from '../driver';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-vehicle-dialog',
    templateUrl: './vehicle-dialog.component.html'
})
export class VehicleDialogComponent implements OnInit {

    vehicle: Vehicle;
    isSaving: boolean;

    insurancedetails: InsuranceDetails[];

    drivers: Driver[];
    currentAccount: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehicleService: VehicleService,
        private insuranceDetailsService: InsuranceDetailsService,
        private driverService: DriverService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.isSaving = false;
        this.insuranceDetailsService
            .query({filter: 'vehicle-is-null'})
            .subscribe((res: HttpResponse<InsuranceDetails[]>) => {
                if (!this.vehicle.insurancedetails || !this.vehicle.insurancedetails.id) {
                    this.insurancedetails = res.body;
                } else {
                    this.insuranceDetailsService
                        .find(this.vehicle.insurancedetails.id)
                        .subscribe((subRes: HttpResponse<InsuranceDetails>) => {
                            this.insurancedetails = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
            this.driverService.query()
            .subscribe((res: HttpResponse<Driver[]>) => { this.drivers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleService.update(this.vehicle));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleService.create(this.vehicle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Vehicle>>) {
        result.subscribe((res: HttpResponse<Vehicle>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Vehicle) {
        this.eventManager.broadcast({ name: 'vehicleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInsuranceDetailsById(index: number, item: InsuranceDetails) {
        return item.id;
    }

    trackDriverById(index: number, item: Driver) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vehicle-popup',
    template: ''
})
export class VehiclePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiclePopupService: VehiclePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehiclePopupService
                    .open(VehicleDialogComponent as Component, params['id']);
            } else {
                this.vehiclePopupService
                    .open(VehicleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
