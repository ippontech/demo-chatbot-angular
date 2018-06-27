/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { VehicleComponent } from '../../../../../../main/webapp/app/entities/vehicle/vehicle.component';
import { VehicleService } from '../../../../../../main/webapp/app/entities/vehicle/vehicle.service';
import { Vehicle } from '../../../../../../main/webapp/app/entities/vehicle/vehicle.model';

describe('Component Tests', () => {

    describe('Vehicle Management Component', () => {
        let comp: VehicleComponent;
        let fixture: ComponentFixture<VehicleComponent>;
        let service: VehicleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [VehicleComponent],
                providers: [
                    VehicleService
                ]
            })
            .overrideTemplate(VehicleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VehicleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VehicleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Vehicle(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.vehicles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
