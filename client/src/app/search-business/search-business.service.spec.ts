import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { SearchBusinessService } from './search-business.service';

describe('search business service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SearchBusinessService]
        })
    })

    let searchBusinessService: SearchBusinessService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        searchBusinessService = TestBed.get(SearchBusinessService);
        httpTestingController = TestBed.get(HttpTestingController);
    })

    // test when backend is ready
    // describe('get company name from api', () => {
    //     it('should retrurn an array with the name thats been searched or similar names', () => {
    //         searchBusinessService.requestCompanyNameFromApi('שלג')
    //             .subscribe(names => {
    //                 expect(names.length).toBeGreaterThan(0)
    //             })

    //         const request = httpTestingController.expectOne();
    //         request.flush(['שלג הנדסה', 'שלג']);
    //         httpTestingController.verify();
    //     })
    // })

    describe('get company records', () => {
        it('should return company records from server', () => {
            searchBusinessService.getCompnayReports('שלג')
                .subscribe(records => {
                    expect(records.length).toBeGreaterThan(0)
                })
                const request = httpTestingController.expectOne('url');
                request.flush([{companyNmae: 'שלג',shotefPlus:60}]);
                httpTestingController.verify()
        })

        it('should return empty array if company have no records',()=>{
            searchBusinessService.getCompnayReports('שלג')
            .subscribe(records => {
                expect(records.length).toBe(0)
            })
            const request = httpTestingController.expectOne('url');
            request.flush([]);
            httpTestingController.verify()
        })
    })
})