/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../test.module';
import { InsuranceDetailsDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details-delete-dialog.component';
import { InsuranceDetailsService } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details.service';

describe('Component Tests', () => {

    describe('InsuranceDetails Management Delete Component', () => {
        let comp: InsuranceDetailsDeleteDialogComponent;
        let fixture: ComponentFixture<InsuranceDetailsDeleteDialogComponent>;
        let service: InsuranceDetailsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InsuranceDetailsDeleteDialogComponent],
                providers: [
                    InsuranceDetailsService
                ]
            })
            .overrideTemplate(InsuranceDetailsDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InsuranceDetailsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsuranceDetailsService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

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
