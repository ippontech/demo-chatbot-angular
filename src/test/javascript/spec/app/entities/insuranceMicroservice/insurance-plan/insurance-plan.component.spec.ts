/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { InsurancePlanComponent } from 'app/entities/insuranceMicroservice/insurance-plan/insurance-plan.component';
import { InsurancePlanService } from 'app/entities/insuranceMicroservice/insurance-plan/insurance-plan.service';
import { InsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';

describe('Component Tests', () => {
    describe('InsurancePlan Management Component', () => {
        let comp: InsurancePlanComponent;
        let fixture: ComponentFixture<InsurancePlanComponent>;
        let service: InsurancePlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InsurancePlanComponent],
                providers: []
            })
                .overrideTemplate(InsurancePlanComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InsurancePlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsurancePlanService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new InsurancePlan(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.insurancePlans[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
