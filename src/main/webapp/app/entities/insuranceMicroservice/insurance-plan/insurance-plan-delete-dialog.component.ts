import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';
import { InsurancePlanService } from './insurance-plan.service';

@Component({
    selector: 'jhi-insurance-plan-delete-dialog',
    templateUrl: './insurance-plan-delete-dialog.component.html'
})
export class InsurancePlanDeleteDialogComponent {
    insurancePlan: IInsurancePlan;

    constructor(
        private insurancePlanService: InsurancePlanService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.insurancePlanService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'insurancePlanListModification',
                content: 'Deleted an insurancePlan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-insurance-plan-delete-popup',
    template: ''
})
export class InsurancePlanDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ insurancePlan }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InsurancePlanDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.insurancePlan = insurancePlan;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
