import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';

type EntityResponseType = HttpResponse<IInsurancePlan>;
type EntityArrayResponseType = HttpResponse<IInsurancePlan[]>;

@Injectable({ providedIn: 'root' })
export class InsurancePlanService {
    private resourceUrl = SERVER_API_URL + 'insurancemicroservice/api/insurance-plans';

    constructor(private http: HttpClient) {}

    create(insurancePlan: IInsurancePlan): Observable<EntityResponseType> {
        return this.http.post<IInsurancePlan>(this.resourceUrl, insurancePlan, { observe: 'response' });
    }

    update(insurancePlan: IInsurancePlan): Observable<EntityResponseType> {
        return this.http.put<IInsurancePlan>(this.resourceUrl, insurancePlan, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInsurancePlan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInsurancePlan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
