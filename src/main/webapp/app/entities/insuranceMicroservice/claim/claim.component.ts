import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClaim } from 'app/shared/model/insuranceMicroservice/claim.model';
import { Principal } from 'app/core';
import { ClaimService } from './claim.service';
import { IVehicle } from 'app/shared/model/insuranceMicroservice/vehicle.model';

import { Router } from '@angular/router';

@Component({
    selector: 'jhi-claim',
    templateUrl: './claim.component.html'
})
export class ClaimComponent implements OnInit, OnDestroy {
    claims: IClaim[];
    vehicle: IVehicle;
    currentAccount: any;
    eventSubscriber: Subscription;

    @Input() selectVehicle: IVehicle;

    constructor(
        private claimService: ClaimService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private router: Router
    ) {}

    loadAll() {
        this.claimService.query(this.selectVehicle.id).subscribe(
            (res: HttpResponse<IClaim[]>) => {
                this.claims = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        // console.log(this.selectVehicle);
        this.vehicle = this.selectVehicle;
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
        // console.log("#claims= ", this.claims.length);
        return this.claims.length > 0;
    }
}
