import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDriver } from 'app/shared/model/insuranceMicroservice/driver.model';
import { DriverService } from './driver.service';
import { Principal, Account } from 'app/core';

@Component({
    selector: 'jhi-driver-update',
    templateUrl: './driver-update.component.html'
})
export class DriverUpdateComponent implements OnInit {
    private _driver: IDriver;
    account: Account;
    isSaving: boolean;
    birthDateDp: any;
    licenseDateDp: any;

    constructor(private driverService: DriverService, private activatedRoute: ActivatedRoute, private principal: Principal) {}

    ngOnInit() {
        this.principal.identity().then(account => {
            this.account = account;
        });
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ driver }) => {
            this.driver = driver;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.driver.id !== undefined) {
            this.subscribeToSaveResponse(this.driverService.update(this.driver));
        } else {
            if (this.account) {
                this.driver.userLogin = this.account.login;
            }
            this.subscribeToSaveResponse(this.driverService.create(this.driver));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDriver>>) {
        result.subscribe((res: HttpResponse<IDriver>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get driver() {
        return this._driver;
    }

    set driver(driver: IDriver) {
        this._driver = driver;
    }
}
