import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InsuranceDetails } from './insurance-details.model';
import { InsuranceDetailsPopupService } from './insurance-details-popup.service';
import { InsuranceDetailsService } from './insurance-details.service';

@Component({
    selector: 'jhi-insurance-details-dialog',
    templateUrl: './insurance-details-dialog.component.html'
})
export class InsuranceDetailsDialogComponent implements OnInit {

    insuranceDetails: InsuranceDetails;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private insuranceDetailsService: InsuranceDetailsService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.insuranceDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.insuranceDetailsService.update(this.insuranceDetails));
        } else {
            this.subscribeToSaveResponse(
                this.insuranceDetailsService.create(this.insuranceDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InsuranceDetails>>) {
        result.subscribe((res: HttpResponse<InsuranceDetails>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: InsuranceDetails) {
        this.eventManager.broadcast({ name: 'insuranceDetailsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-insurance-details-popup',
    template: ''
})
export class InsuranceDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private insuranceDetailsPopupService: InsuranceDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.insuranceDetailsPopupService
                    .open(InsuranceDetailsDialogComponent as Component, params['id']);
            } else {
                this.insuranceDetailsPopupService
                    .open(InsuranceDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
