/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { InsurancePlanUpdateComponent } from 'app/entities/insuranceMicroservice/insurance-plan/insurance-plan-update.component';
import { InsurancePlanService } from 'app/entities/insuranceMicroservice/insurance-plan/insurance-plan.service';
import { InsurancePlan } from 'app/shared/model/insuranceMicroservice/insurance-plan.model';

describe('Component Tests', () => {
    describe('InsurancePlan Management Update Component', () => {
        let comp: InsurancePlanUpdateComponent;
        let fixture: ComponentFixture<InsurancePlanUpdateComponent>;
        let service: InsurancePlanService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InsurancePlanUpdateComponent]
            })
                .overrideTemplate(InsurancePlanUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InsurancePlanUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsurancePlanService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InsurancePlan(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.insurancePlan = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InsurancePlan();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.insurancePlan = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
