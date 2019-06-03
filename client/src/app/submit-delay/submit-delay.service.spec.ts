import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { SubmitDelayService } from './submit-delay.service';

describe('submit delay service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SubmitDelayService]
        })
    })

    describe('submit delay tp api', () => {
        let submitDelayService: SubmitDelayService;
        let httpTestingController: HttpTestingController;

        beforeEach(() => {
            submitDelayService = TestBed.get(SubmitDelayService);
            httpTestingController = TestBed.get(HttpTestingController)
        })

        it('should POST a "delay in payment" report', () => {
            const mockReport = {
                companyName: 'test',
                shotefPlus: 40,
                daysOfDelay: 40
            }
            submitDelayService.submitDelayToApi(mockReport).subscribe(response => {
                expect(response.reportSaved).toBe(true);
            })

            const request = httpTestingController.expectOne('https://app.fakejson.com/q');
            request.flush({ reportSaved: true });
            httpTestingController.verify()
        })
    })
})