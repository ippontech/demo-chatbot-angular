import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { InsuranceDetails } from './insurance-details.model';
import { InsuranceDetailsService } from './insurance-details.service';

@Injectable()
export class InsuranceDetailsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private insuranceDetailsService: InsuranceDetailsService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.insuranceDetailsService.find(id)
                    .subscribe((insuranceDetailsResponse: HttpResponse<InsuranceDetails>) => {
                        const insuranceDetails: InsuranceDetails = insuranceDetailsResponse.body;
                        this.ngbModalRef = this.insuranceDetailsModalRef(component, insuranceDetails);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.insuranceDetailsModalRef(component, new InsuranceDetails());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    insuranceDetailsModalRef(component: Component, insuranceDetails: InsuranceDetails): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.insuranceDetails = insuranceDetails;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
