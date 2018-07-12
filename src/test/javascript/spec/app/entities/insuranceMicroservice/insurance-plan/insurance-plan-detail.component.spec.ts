/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { InsurancePlanDetailComponent } from 'app/entities/insuranceMicroservice/insurance-plan/insurance-plan-detail.component';
import { InsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';

describe('Component Tests', () => {
    describe('InsurancePlan Management Detail Component', () => {
        let comp: InsurancePlanDetailComponent;
        let fixture: ComponentFixture<InsurancePlanDetailComponent>;
        const route = ({ data: of({ insurancePlan: new InsurancePlan(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InsurancePlanDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InsurancePlanDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InsurancePlanDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.insurancePlan).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
