import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { SignUpService } from './sign-up.service';
import { environment } from '../../environments/environment'


describe('sign-up service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SignUpService]
        })
    })

    describe('send new user credentials to server', () => {
        let signUpService: SignUpService;
        let httpTestingController: HttpTestingController;

        beforeEach(() => {
            signUpService = TestBed.get(SignUpService);
            httpTestingController = TestBed.get(HttpTestingController)
        })

        it('should POST a "delay in payment" report', () => {
            const mockUser = {
                email: 'a.kluge202@gmail.com',
                password: '123456',
                employmentType: 'freeLancer',
                freeLancerId: 321332424
            }
            signUpService.registerAccount(mockUser).subscribe(response => {
                expect(response.userCreated).toBe(true);
            })

            const request = httpTestingController.expectOne(environment.apiUrl);
            request.flush({ userCreated: true });
            httpTestingController.verify()
        })
    })
})