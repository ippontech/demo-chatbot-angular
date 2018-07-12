import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IClaim } from 'app/shared/model/insuranceMicroservice/claim.model';
import { ClaimService } from './claim.service';
import { IVehicle } from 'app/shared/model/insuranceMicroservice/vehicle.model';
import { VehicleService } from 'app/entities/insuranceMicroservice/vehicle';

@Component({
    selector: 'jhi-claim-update',
    templateUrl: './claim-update.component.html'
})
export class ClaimUpdateComponent implements OnInit {
    private _claim: IClaim;
    isSaving: boolean;

    vehicles: IVehicle[];
    accidentDateDp: any;
    accidentTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private claimService: ClaimService,
        private vehicleService: VehicleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ claim }) => {
            this.claim = claim;
        });
        this.vehicleService.query().subscribe(
            (res: HttpResponse<IVehicle[]>) => {
                this.vehicles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.claim.accidentTime = moment(this.accidentTime, DATE_TIME_FORMAT);
        if (this.claim.id !== undefined) {
            this.subscribeToSaveResponse(this.claimService.update(this.claim));
        } else {
            this.subscribeToSaveResponse(this.claimService.create(this.claim));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClaim>>) {
        result.subscribe((res: HttpResponse<IClaim>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVehicleById(index: number, item: IVehicle) {
        return item.id;
    }
    get claim() {
        return this._claim;
    }

    set claim(claim: IClaim) {
        this._claim = claim;
        this.accidentTime = moment(claim.accidentTime).format(DATE_TIME_FORMAT);
    }
}
