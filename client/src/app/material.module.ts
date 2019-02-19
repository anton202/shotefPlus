import { NgModule } from "@angular/core";
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

import { SignUpComponent } from './sign-up/sign-up.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations:[
        SignUpComponent
    ],
    imports:[
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule
    ],
    exports:[
        SignUpComponent,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule
    ],
    entryComponents: [SignUpComponent]
})
export class MaterialModule{}