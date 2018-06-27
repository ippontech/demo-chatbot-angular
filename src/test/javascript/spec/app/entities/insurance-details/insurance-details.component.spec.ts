/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { InsuranceDetailsComponent } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details.component';
import { InsuranceDetailsService } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details.service';
import { InsuranceDetails } from '../../../../../../main/webapp/app/entities/insurance-details/insurance-details.model';

describe('Component Tests', () => {

    describe('InsuranceDetails Management Component', () => {
        let comp: InsuranceDetailsComponent;
        let fixture: ComponentFixture<InsuranceDetailsComponent>;
        let service: InsuranceDetailsService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [InsuranceDetailsComponent],
                providers: [
                    InsuranceDetailsService
                ]
            })
            .overrideTemplate(InsuranceDetailsComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InsuranceDetailsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InsuranceDetailsService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new InsuranceDetails(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.insuranceDetails[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
