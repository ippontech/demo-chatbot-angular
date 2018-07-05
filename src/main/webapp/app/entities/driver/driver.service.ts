import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Driver } from './driver.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Driver>;

@Injectable()
export class DriverService {

    private resourceUrl =  SERVER_API_URL + 'microservice/api/drivers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(driver: Driver): Observable<EntityResponseType> {
        const copy = this.convert(driver);
        return this.http.post<Driver>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(driver: Driver): Observable<EntityResponseType> {
        const copy = this.convert(driver);
        return this.http.put<Driver>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Driver>(`${this.resourceUrl}/byId/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(login?: string,req?: any): Observable<HttpResponse<Driver[]>> {
        const options = createRequestOption(req);
        if(!login){
            login="admin";
        }
        console.log("about to send http request with login: {}", login);
        return this.http.get<Driver[]>(`${this.resourceUrl}/byLogin/${login}`, { params: options, observe: 'response' })
            .map((res: HttpResponse<Driver[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/byId/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Driver = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Driver[]>): HttpResponse<Driver[]> {
        const jsonResponse: Driver[] = res.body;
        const body: Driver[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Driver.
     */
    private convertItemFromServer(driver: Driver): Driver {
        const copy: Driver = Object.assign({}, driver);
        copy.birthDate = this.dateUtils
            .convertLocalDateFromServer(driver.birthDate);
        copy.licenseDate = this.dateUtils
            .convertLocalDateFromServer(driver.licenseDate);
        return copy;
    }

    /**
     * Convert a Driver to a JSON which can be sent to the server.
     */
    private convert(driver: Driver): Driver {
        const copy: Driver = Object.assign({}, driver);
        copy.birthDate = this.dateUtils
            .convertLocalDateToServer(driver.birthDate);
        copy.licenseDate = this.dateUtils
            .convertLocalDateToServer(driver.licenseDate);
        return copy;
    }
}
