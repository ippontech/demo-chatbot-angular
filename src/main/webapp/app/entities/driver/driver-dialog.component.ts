import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Driver } from './driver.model';
import { DriverPopupService } from './driver-popup.service';
import { DriverService } from './driver.service';
import { Account, Principal } from '../../shared';

@Component({
    selector: 'jhi-driver-dialog',
    templateUrl: './driver-dialog.component.html'
})
export class DriverDialogComponent implements OnInit {

    driver: Driver;
    isSaving: boolean;
    birthDateDp: any;
    licenseDateDp: any;
    account: Account;

    constructor(
        public activeModal: NgbActiveModal,
        private driverService: DriverService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }


    ngOnInit() {
        this.isSaving = false;
        this.principal.identity().then((account) => {
            this.account = account;
        });
        
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (!this.driver.userLogin){
            this.driver.userLogin=this.account.login;
        }
        console.log(this.account);
        
        if (this.driver.id !== undefined) {
            this.subscribeToSaveResponse(
                this.driverService.update(this.driver));
        } else {
            this.subscribeToSaveResponse(
                this.driverService.create(this.driver));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Driver>>) {
        result.subscribe((res: HttpResponse<Driver>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Driver) {
        this.eventManager.broadcast({ name: 'driverListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-driver-popup',
    template: ''
})
export class DriverPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private driverPopupService: DriverPopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.driverPopupService
                    .open(DriverDialogComponent as Component, params['id']);
            } else {
                this.driverPopupService
                    .open(DriverDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
