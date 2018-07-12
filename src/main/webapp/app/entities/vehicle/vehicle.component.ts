import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vehicle } from './vehicle.model';
import { VehicleService } from './vehicle.service';
import { Principal, Account } from '../../shared';
import { DriverService, Driver } from '../driver';
import { InsuranceDetails, InsuranceDetailsService } from '../insurance-details';

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

    constructor(
        private vehicleService: VehicleService,
        private driverService: DriverService,
        private insuranceService: InsuranceDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.vehicleService.query().subscribe(
            (res: HttpResponse<Vehicle[]>) => {
                this.vehicles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.principal.identity().then(account => {
            this.currentAccount = account;
            // this.driverService.query(this.currentAccount.login).subscribe(
            //     (res: HttpResponse<Driver[]>) => {
            //         this.drivers = res.body;
            //     },
            //     (res: HttpErrorResponse) => this.onError(res.message)
            // );
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
        this.eventSubscriber = this.eventManager.subscribe('vehicleListModification', response => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    hasCar() {
        return this.vehicles.length > 0;
    }

    updateInsurance(level: number, selectVehicle: Vehicle): void {
        this.vehicle = selectVehicle;
        //this.vehicle.insurancedetails
        this.insuranceService.find(level).subscribe(
            (res: HttpResponse<InsuranceDetails>) => {
                this.insuranceDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.vehicle.insurancedetails = this.insuranceDetails;
        this.vehicleService.update(this.vehicle);
    }
}
