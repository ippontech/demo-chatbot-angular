import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDriver } from 'app/shared/model/insuranceMicroservice/driver.model';
import { Principal, Account } from 'app/core';
import { DriverService } from './driver.service';

@Component({
    selector: 'jhi-driver',
    templateUrl: './driver.component.html'
})
export class DriverComponent implements OnInit, OnDestroy {
    drivers: IDriver[];
    currentAccount: Account;
    eventSubscriber: Subscription;

    constructor(
        private driverService: DriverService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.driverService.query().subscribe(
            (res: HttpResponse<IDriver[]>) => {
                this.drivers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDrivers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDriver) {
        return item.id;
    }

    registerChangeInDrivers() {
        this.eventSubscriber = this.eventManager.subscribe('driverListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    hasDriverProfile() {
        return this.drivers.length > 0;
    }
}
