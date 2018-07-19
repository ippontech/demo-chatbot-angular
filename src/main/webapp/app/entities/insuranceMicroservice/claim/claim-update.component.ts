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

@Component({
    selector: 'jhi-claim-update',
    templateUrl: './claim-update.component.html'
})
export class ClaimUpdateComponent implements OnInit {
    private _claim: IClaim;
    isSaving: boolean;
    accidentDateDp: any;
    accidentTime: string;
    vehicle: IVehicle;

    constructor(private jhiAlertService: JhiAlertService, private claimService: ClaimService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ claim, vehicle }) => {
            this.claim = claim;
            this.vehicle = vehicle;
        });
        console.log(this.claim);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.claim.accidentTime = moment(this.accidentTime, 'hh:mm a');
        if (this.claim.id !== undefined) {
            this.subscribeToSaveResponse(this.claimService.update(this.claim));
        } else {
            this.claim.vehicle = this.vehicle;
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
        this.accidentTime = moment(claim.accidentTime).format('hh:mm a');
    }
}
