/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { InsurancePlanDeleteDialogComponent } from 'app/entities/insuranceMicroservice/insurance-plan/insurance-plan-delete-dialog.component';
import { InsurancePlanService } from 'app/entities/insuranceMicroservice/insurance-plan/insurance-plan.service';

describe('Component Tests', () => {
    describe('InsurancePlan Management Delete Component', () => {
        let comp: InsurancePlanDeleteDialogComponent;
        let fixture: ComponentFixture<InsurancePlanDeleteDialogComponent>;
        let service: InsurancePlanService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InsurancePlanDeleteDialogComponent]
            })
                .overrideTemplate(InsurancePlanDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InsurancePlanDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsurancePlanService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
