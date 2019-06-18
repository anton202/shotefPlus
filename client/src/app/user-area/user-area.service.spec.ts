import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { UserAreaService } from './user-area.service';

describe('user area service', () => {
    let userAreaService: UserAreaService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [UserAreaService]
        })
    })

    beforeEach(() => {
        userAreaService = TestBed.get(UserAreaService);
        httpTestingController = TestBed.get(HttpTestingController)
    })

    describe('methods', () => {

        it('should fetch user reports from server', () => {
            userAreaService.getReports().subscribe(reports => {
                expect(reports.length).toBeGreaterThan(0);
            })

            const request = httpTestingController.expectOne(userAreaService.apiUrl);
            request.flush([{}, {}, {}])
            httpTestingController.verify()
        })
    })

    it('should save changes', () => {
        const mockReport = {
            shotefPlus: 60,
            days_of_delay: 30,
            comment: 'bakfnfk',
            evidence: ['skgjskjg']

        }
        userAreaService.saveChanges('2', mockReport).subscribe((response) => {
            expect(response).toBeTruthy()
        })

        const request = httpTestingController.expectOne(`${userAreaService.apiUrl}/${2}`);
        request.flush({ reportSaved: true });
        httpTestingController.verify()
    })

    it('shoulf delete report', () => {
        userAreaService.deleteReport('3').subscribe(response =>{
            expect(response).toBeTruthy()
        })

        const request = httpTestingController.expectOne(`${userAreaService.apiUrl}/${3}`);
        request.flush({reportDeleted:true})
        httpTestingController.verify();
    })

    it('delete evidence',()=>{
        userAreaService.deleteEvidence('3','dsfljfjs').subscribe(response=>{
            expect(response).toBeTruthy();
        })

        const request = httpTestingController.expectOne(`${userAreaService.apiUrl}/3/dsfljfjs`);
        request.flush({reportDeleted: true});
        httpTestingController.verify()
    })
})