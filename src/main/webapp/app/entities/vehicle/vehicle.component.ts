import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vehicle } from './vehicle.model';
import { VehicleService } from './vehicle.service';
import { Principal, Account } from '../../shared';
import { DriverService, Driver } from '../driver';
import { InsuranceDetails, InsuranceDetailsService } from '../insurance-details';
import { Observable } from '../../../../../../node_modules/rxjs';

@Component({
    selector: 'jhi-vehicle',
    templateUrl: './vehicle.component.html'
})
export class VehicleComponent implements OnInit, OnDestroy {
    vehicle: Vehicle;
    vehicles: Vehicle[];
    drivers: Driver[];
    insuranceDetails: InsuranceDetails;
    currentAccount: Account;
    eventSubscriber: Subscription;
    isSaving : boolean;

    constructor(
        private vehicleService: VehicleService,
        private driverService: DriverService,
        private insuranceService: InsuranceDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vehicleService.query().subscribe(
            (res: HttpResponse<Vehicle[]>) => {
                this.vehicles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
            this.loadAll();
        });
        this.registerChangeInVehicles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Vehicle) {
        return item.id;
    }
    registerChangeInVehicles() {
        this.eventSubscriber = this.eventManager.subscribe('vehicleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        console.log("error");
        this.jhiAlertService.error(error.message, null, null);
        console.log(error.message);
    }
    hasCar() {
        return this.vehicles.length>0;
    }

    updateInsurance(level:number, selectVehicle:Vehicle): void{
        this.vehicle=selectVehicle;
        this.subscribeToFindResponse(this.insuranceService.find(level));
    }
    private subscribeToSaveResponse(result: Observable<HttpResponse<Vehicle>>) {
        console.log("about to update");
        result.subscribe(
            (res: HttpResponse<InsuranceDetails>) => {
            },
            (res: HttpErrorResponse) => {console.log("catch that modafuka",res)}
        );
    }
    private subscribeToFindResponse(result: Observable<HttpResponse<InsuranceDetails>>){
        result.subscribe(
            (res: HttpResponse<InsuranceDetails>) => {
                console.log(this.vehicle.insurancedetails);
                this.vehicle.insurancedetails = res.body;
                console.log(res.body);
                console.log("find");
                this.subscribeToSaveResponse(this.vehicleService.update(this.vehicle));

            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
}
