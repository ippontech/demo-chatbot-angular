import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IInsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';
import { InsurancePlanService } from './insurance-plan.service';

@Component({
    selector: 'jhi-insurance-plan-update',
    templateUrl: './insurance-plan-update.component.html'
})
export class InsurancePlanUpdateComponent implements OnInit {
    private _insurancePlan: IInsurancePlan;
    isSaving: boolean;

    constructor(private insurancePlanService: InsurancePlanService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ insurancePlan }) => {
            this.insurancePlan = insurancePlan;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.insurancePlan.id !== undefined) {
            this.subscribeToSaveResponse(this.insurancePlanService.update(this.insurancePlan));
        } else {
            this.subscribeToSaveResponse(this.insurancePlanService.create(this.insurancePlan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInsurancePlan>>) {
        result.subscribe((res: HttpResponse<IInsurancePlan>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get insurancePlan() {
        return this._insurancePlan;
    }

    set insurancePlan(insurancePlan: IInsurancePlan) {
        this._insurancePlan = insurancePlan;
    }
}
