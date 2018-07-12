import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';

@Component({
    selector: 'jhi-insurance-plan-detail',
    templateUrl: './insurance-plan-detail.component.html'
})
export class InsurancePlanDetailComponent implements OnInit {
    insurancePlan: IInsurancePlan;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ insurancePlan }) => {
            this.insurancePlan = insurancePlan;
        });
    }

    previousState() {
        window.history.back();
    }
}
