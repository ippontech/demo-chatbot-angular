import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClaim } from 'app/shared/model/insuranceMicroservice/claim.model';

type EntityResponseType = HttpResponse<IClaim>;
type EntityArrayResponseType = HttpResponse<IClaim[]>;

@Injectable({ providedIn: 'root' })
export class ClaimService {
    private resourceUrl = SERVER_API_URL + 'insurancemicroservice/api/claims';

    constructor(private http: HttpClient) {}

    create(claim: IClaim): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(claim);
        return this.http
            .post<IClaim>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(claim: IClaim): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(claim);
        return this.http
            .put<IClaim>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IClaim>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(vehicleId?: number, req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        if (!vehicleId) {
            return this.http
                .get<IClaim[]>(`${this.resourceUrl}`, { params: options, observe: 'response' })
                .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
        }
        console.log("it's number ", vehicleId);
        return this.http
            .get<IClaim[]>(`${this.resourceUrl}/byVehicle/${vehicleId}`, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(claim: IClaim): IClaim {
        const copy: IClaim = Object.assign({}, claim, {
            accidentDate: claim.accidentDate != null && claim.accidentDate.isValid() ? claim.accidentDate.format(DATE_FORMAT) : null,
            accidentTime: claim.accidentTime != null && claim.accidentTime.isValid() ? claim.accidentTime.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.accidentDate = res.body.accidentDate != null ? moment(res.body.accidentDate) : null;
        res.body.accidentTime = res.body.accidentTime != null ? moment(res.body.accidentTime) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((claim: IClaim) => {
            claim.accidentDate = claim.accidentDate != null ? moment(claim.accidentDate) : null;
            claim.accidentTime = claim.accidentTime != null ? moment(claim.accidentTime) : null;
        });
        return res;
    }
}
