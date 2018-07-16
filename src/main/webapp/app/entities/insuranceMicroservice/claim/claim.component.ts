import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClaim } from 'app/shared/model/insuranceMicroservice/claim.model';
import { Principal } from 'app/core';
import { ClaimService } from './claim.service';

@Component({
    selector: 'jhi-claim',
    templateUrl: './claim.component.html'
})
export class ClaimComponent implements OnInit, OnDestroy {
    claims: IClaim[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private claimService: ClaimService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.claimService.query().subscribe(
            (res: HttpResponse<IClaim[]>) => {
                this.claims = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInClaims();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClaim) {
        return item.id;
    }

    registerChangeInClaims() {
        this.eventSubscriber = this.eventManager.subscribe('claimListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    hasClaims() {
        return this.claims.length > 0;
    }
}
