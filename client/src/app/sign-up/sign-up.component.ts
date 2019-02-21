import { Component } from '@angular/core';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ SignUpService ]
})
export class SignUpComponent  {
  successfullyRegistrated 
  isRegisterClicked = false;

  constructor(private signUpService: SignUpService) { }

  signUp(formValues){
    this.isRegisterClicked = true;
    
    this.signUpService.registerAccount(formValues)
      .subscribe((response)=>{
        this.successfullyRegistrated = true;
      },
      error =>{
        this.successfullyRegistrated = false
      })

    console.log(formValues);
  }

}
