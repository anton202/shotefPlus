import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { SignInService } from './sign-in.service';
import { environment } from '../../environments/environment'

describe('sign-in service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SignInService]
        })
    })

    describe('login', () => {
        let signInService: SignInService;
        let httpTestingController: HttpTestingController;

        beforeEach(() => {
            signInService = TestBed.get(SignInService);
            httpTestingController = TestBed.get(HttpTestingController);
        })

        it('should send login credentials to server', () => {
            const loginMock = {
                email: 'a.kluge202@gmail.com',
                password: '123455'
            }

            signInService.login(loginMock).subscribe(response => {
                expect(response).toBeTruthy()
            })

            const request = httpTestingController.expectOne(environment.apiUrl)
            request.flush({logdIn: true})
            httpTestingController.verify()
        })
    })

})