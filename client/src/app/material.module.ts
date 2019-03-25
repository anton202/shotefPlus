import { NgModule } from "@angular/core";
import { BrowserAnimationsModule}  from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'


import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
    imports:[
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatExpansionModule,
    ],
    exports:[
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatExpansionModule
    ],
})
export class MaterialModule{}