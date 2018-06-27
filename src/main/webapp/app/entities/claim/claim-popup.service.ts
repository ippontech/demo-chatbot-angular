import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Claim } from './claim.model';
import { ClaimService } from './claim.service';

@Injectable()
export class ClaimPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private claimService: ClaimService

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
                this.claimService.find(id)
                    .subscribe((claimResponse: HttpResponse<Claim>) => {
                        const claim: Claim = claimResponse.body;
                        if (claim.accidentDate) {
                            claim.accidentDate = {
                                year: claim.accidentDate.getFullYear(),
                                month: claim.accidentDate.getMonth() + 1,
                                day: claim.accidentDate.getDate()
                            };
                        }
                        claim.accidentTime = this.datePipe
                            .transform(claim.accidentTime, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.claimModalRef(component, claim);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.claimModalRef(component, new Claim());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    claimModalRef(component: Component, claim: Claim): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.claim = claim;
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
