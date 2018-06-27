import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InsuranceDetails } from './insurance-details.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InsuranceDetails>;

@Injectable()
export class InsuranceDetailsService {

    private resourceUrl =  SERVER_API_URL + 'microservice/api/insurance-details';

    constructor(private http: HttpClient) { }

    create(insuranceDetails: InsuranceDetails): Observable<EntityResponseType> {
        const copy = this.convert(insuranceDetails);
        return this.http.post<InsuranceDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(insuranceDetails: InsuranceDetails): Observable<EntityResponseType> {
        const copy = this.convert(insuranceDetails);
        return this.http.put<InsuranceDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InsuranceDetails>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InsuranceDetails[]>> {
        const options = createRequestOption(req);
        return this.http.get<InsuranceDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InsuranceDetails[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InsuranceDetails = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InsuranceDetails[]>): HttpResponse<InsuranceDetails[]> {
        const jsonResponse: InsuranceDetails[] = res.body;
        const body: InsuranceDetails[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InsuranceDetails.
     */
    private convertItemFromServer(insuranceDetails: InsuranceDetails): InsuranceDetails {
        const copy: InsuranceDetails = Object.assign({}, insuranceDetails);
        return copy;
    }

    /**
     * Convert a InsuranceDetails to a JSON which can be sent to the server.
     */
    private convert(insuranceDetails: InsuranceDetails): InsuranceDetails {
        const copy: InsuranceDetails = Object.assign({}, insuranceDetails);
        return copy;
    }
}
