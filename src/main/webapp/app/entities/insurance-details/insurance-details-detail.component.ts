import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InsuranceDetails } from './insurance-details.model';
import { InsuranceDetailsService } from './insurance-details.service';

@Component({
    selector: 'jhi-insurance-details-detail',
    templateUrl: './insurance-details-detail.component.html'
})
export class InsuranceDetailsDetailComponent implements OnInit, OnDestroy {

    insuranceDetails: InsuranceDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private insuranceDetailsService: InsuranceDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInsuranceDetails();
    }

    load(id) {
        this.insuranceDetailsService.find(id)
            .subscribe((insuranceDetailsResponse: HttpResponse<InsuranceDetails>) => {
                this.insuranceDetails = insuranceDetailsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInsuranceDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'insuranceDetailsListModification',
            (response) => this.load(this.insuranceDetails.id)
        );
    }
}
