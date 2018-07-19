import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVehicle } from 'app/shared/model/insuranceMicroservice/vehicle.model';
import { VehicleService } from './vehicle.service';
import { IDriver } from 'app/shared/model/insuranceMicroservice/driver.model';
import { DriverService } from 'app/entities/insuranceMicroservice/driver';

@Component({
    selector: 'jhi-vehicle-update',
    templateUrl: './vehicle-update.component.html'
})
export class VehicleUpdateComponent implements OnInit {
    private _vehicle: IVehicle;
    isSaving: boolean;

    drivers: IDriver[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private vehicleService: VehicleService,
        private driverService: DriverService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vehicle }) => {
            this.vehicle = vehicle;
        });
        this.driverService.query().subscribe(
            (res: HttpResponse<IDriver[]>) => {
                this.drivers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vehicle.id !== undefined) {
            this.subscribeToSaveResponse(this.vehicleService.update(this.vehicle));
        } else {
            if (this.drivers) {
                this.vehicle.driver = this.drivers[0];
            }
            this.subscribeToSaveResponse(this.vehicleService.create(this.vehicle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVehicle>>) {
        result.subscribe((res: HttpResponse<IVehicle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDriverById(index: number, item: IDriver) {
        return item.id;
    }
    get vehicle() {
        return this._vehicle;
    }

    set vehicle(vehicle: IVehicle) {
        this._vehicle = vehicle;
    }
}
