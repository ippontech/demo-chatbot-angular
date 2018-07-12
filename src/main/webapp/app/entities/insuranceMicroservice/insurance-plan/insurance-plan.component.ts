import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';
import { Principal } from 'app/core';
import { InsurancePlanService } from './insurance-plan.service';

@Component({
    selector: 'jhi-insurance-plan',
    templateUrl: './insurance-plan.component.html'
})
export class InsurancePlanComponent implements OnInit, OnDestroy {
    insurancePlans: IInsurancePlan[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private insurancePlanService: InsurancePlanService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.insurancePlanService.query().subscribe(
            (res: HttpResponse<IInsurancePlan[]>) => {
                this.insurancePlans = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInsurancePlans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInsurancePlan) {
        return item.id;
    }

    registerChangeInInsurancePlans() {
        this.eventSubscriber = this.eventManager.subscribe('insurancePlanListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
