import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription, Observable } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVehicle, Vehicle } from 'app/shared/model/insuranceMicroservice/vehicle.model';
import { Principal } from 'app/core';
import { VehicleService } from './vehicle.service';
import { IInsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';
import { InsurancePlanService } from 'app/entities/insuranceMicroservice/insurance-plan';

@Component({
    selector: 'jhi-vehicle',
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit, OnDestroy {
    vehicles: IVehicle[];
    vehicle: IVehicle;
    insurances: IInsurancePlan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    claimVehicle: IVehicle;

    constructor(
        private vehicleService: VehicleService,
        private insuranceService: InsurancePlanService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        console.log('about to load all');
        this.insuranceService.query().subscribe(
            (res: HttpResponse<IInsurancePlan[]>) => {
                this.insurances = res.body;
                console.log('insurances loaded');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.vehicleService.query().subscribe(
            (res: HttpResponse<IVehicle[]>) => {
                this.vehicles = res.body;
                console.log('vehicles loaded');
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVehicles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVehicle) {
        return item.id;
    }

    registerChangeInVehicles() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    hasCar() {
        //console.log('OH my, one more call', this.vehicles.length);
        return this.vehicles.length > 0;
    }

    updateInsurance(level: number, selectVehicle: Vehicle): void {
        this.vehicle = selectVehicle;
        this.vehicle.insuranceId = level;
        this.subscribeToSaveResponse(this.vehicleService.update(this.vehicle));
    }
    private subscribeToSaveResponse(result: Observable<HttpResponse<Vehicle>>) {
        //console.log('about to update');
        result.subscribe(
            (res: HttpResponse<Vehicle>) => {},
            (res: HttpErrorResponse) => {
                console.log('error to save response:', res);
            }
        );
    }

    makeAClaim(claimVehicle: IVehicle): void {
        this.claimVehicle = claimVehicle;
        console.log(this.claimVehicle);
    }

    clearHistory(): void {
        this.claimVehicle = undefined;
    }
}
