import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InsuranceDetails } from './insurance-details.model';
import { InsuranceDetailsPopupService } from './insurance-details-popup.service';
import { InsuranceDetailsService } from './insurance-details.service';

@Component({
    selector: 'jhi-insurance-details-delete-dialog',
    templateUrl: './insurance-details-delete-dialog.component.html'
})
export class InsuranceDetailsDeleteDialogComponent {

    insuranceDetails: InsuranceDetails;

    constructor(
        private insuranceDetailsService: InsuranceDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.insuranceDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'insuranceDetailsListModification',
                content: 'Deleted an insuranceDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-insurance-details-delete-popup',
    template: ''
})
export class InsuranceDetailsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private insuranceDetailsPopupService: InsuranceDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.insuranceDetailsPopupService
                .open(InsuranceDetailsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
