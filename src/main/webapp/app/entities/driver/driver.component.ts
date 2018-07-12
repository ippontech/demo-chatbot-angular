import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Driver } from './driver.model';
import { DriverService } from './driver.service';
import { Principal, User, Account } from '../../shared';

@Component({
    selector: 'jhi-driver',
    templateUrl: './driver.component.html'
})
export class DriverComponent implements OnInit, OnDestroy {
    drivers: Driver[];
    currentAccount: Account;
    eventSubscriber: Subscription;

    constructor(
        private driverService: DriverService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        //console.log(this.currentAccount.login);
        this.driverService.query(this.currentAccount.login).subscribe(
            (res: HttpResponse<Driver[]>) => {
                this.drivers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.currentAccount = account;            
            this.loadAll();
        });                
        this.registerChangeInDrivers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Driver) {
        return item.id;
    }
    registerChangeInDrivers() {
        this.eventSubscriber = this.eventManager.subscribe('driverListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    hasDriverProfile() {
        return this.drivers.length>0;
    }
}
