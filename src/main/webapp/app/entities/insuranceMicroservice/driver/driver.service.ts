import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDriver } from 'app/shared/model/insuranceMicroservice/driver.model';

type EntityResponseType = HttpResponse<IDriver>;
type EntityArrayResponseType = HttpResponse<IDriver[]>;

@Injectable({ providedIn: 'root' })
export class DriverService {
    private resourceUrl = SERVER_API_URL + 'insurancemicroservice/api/drivers';

    constructor(private http: HttpClient) {}

    create(driver: IDriver): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(driver);
        return this.http
            .post<IDriver>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(driver: IDriver): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(driver);
        return this.http
            .put<IDriver>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDriver>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDriver[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(driver: IDriver): IDriver {
        const copy: IDriver = Object.assign({}, driver, {
            birthDate: driver.birthDate != null && driver.birthDate.isValid() ? driver.birthDate.format(DATE_FORMAT) : null,
            licenseDate: driver.licenseDate != null && driver.licenseDate.isValid() ? driver.licenseDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.birthDate = res.body.birthDate != null ? moment(res.body.birthDate) : null;
        res.body.licenseDate = res.body.licenseDate != null ? moment(res.body.licenseDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((driver: IDriver) => {
            driver.birthDate = driver.birthDate != null ? moment(driver.birthDate) : null;
            driver.licenseDate = driver.licenseDate != null ? moment(driver.licenseDate) : null;
        });
        return res;
    }
}
