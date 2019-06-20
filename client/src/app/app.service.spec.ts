import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { AppService } from './app.service';

describe('app service', () => {
    let appService: AppService;
    let httpTestingControler: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AppService]
        })
    })

    beforeEach(()=>{
        appService = TestBed.get(AppService);
        httpTestingControler = TestBed.get(HttpTestingController);
    })

    describe('authenticate',()=>{
        
    })
})