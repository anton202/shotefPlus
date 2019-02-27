import { NgModule } from "@angular/core";
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from "./sign-in/sign-in.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
    declarations:[
        SignUpComponent,
        SignInComponent
    ],
    imports:[
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatAutocompleteModule
    ],
    exports:[
        SignUpComponent,
        SignInComponent,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatAutocompleteModule
    ],
    entryComponents: [SignUpComponent,SignInComponent]
})
export class MaterialModule{}