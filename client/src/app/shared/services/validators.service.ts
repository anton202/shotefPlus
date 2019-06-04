import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

   // max 4 images validator
 public maxInputFiles(control: FormControl) {
  if (control.value) {
    const filesAmount = control.value.files.length;
    return filesAmount <= 4 ? null : { maxInputFiles: { valid: false } }
  }
}
}
