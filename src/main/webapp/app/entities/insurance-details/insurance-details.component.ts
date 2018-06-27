import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { InsuranceDetails } from './insurance-details.model';
import { InsuranceDetailsService } from './insurance-details.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-insurance-details',
    templateUrl: './insurance-details.component.html'
})
export class InsuranceDetailsComponent implements OnInit, OnDestroy {
insuranceDetails: InsuranceDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private insuranceDetailsService: InsuranceDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.insuranceDetailsService.query().subscribe(
            (res: HttpResponse<InsuranceDetails[]>) => {
                this.insuranceDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInInsuranceDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: InsuranceDetails) {
        return item.id;
    }
    registerChangeInInsuranceDetails() {
        this.eventSubscriber = this.eventManager.subscribe('insuranceDetailsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
