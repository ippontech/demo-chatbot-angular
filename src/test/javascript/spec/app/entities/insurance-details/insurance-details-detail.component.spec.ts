/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../test.module';
import { InsuranceDetailsDetailComponent } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details-detail.component';
import { InsuranceDetailsService } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details.service';
import { InsuranceDetails } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details.model';

describe('Component Tests', () => {

    describe('InsuranceDetails Management Detail Component', () => {
        let comp: InsuranceDetailsDetailComponent;
        let fixture: ComponentFixture<InsuranceDetailsDetailComponent>;
        let service: InsuranceDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InsuranceDetailsDetailComponent],
                providers: [
                    InsuranceDetailsService
                ]
            })
            .overrideTemplate(InsuranceDetailsDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InsuranceDetailsDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsuranceDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new InsuranceDetails(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.insuranceDetails).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
