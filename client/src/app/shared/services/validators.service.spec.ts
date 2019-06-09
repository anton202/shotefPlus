import { TestBed, inject } from '@angular/core/testing';

import { ValidatorsService } from './validators.service';
import { FormControl } from '@angular/forms';

describe('ValidatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ValidatorsService]
  }));

  it('should be created', () => {
    const service: ValidatorsService = TestBed.get(ValidatorsService);
    expect(service).toBeTruthy();
  });

  it('if uploaded more than 4 images, the control should be invalid', inject(
    [ValidatorsService], (service: ValidatorsService) => {

      const inputControl = new FormControl({ files: ['file1', 'file2', 'file3', 'file4', 'file5'] })
      const result = service.maxInputFiles(inputControl);

      expect(result.maxInputFiles.valid).toBeFalsy()
    }))

  it('validator should return valid if less than 4 or 4files been uploaded', inject([ValidatorsService],
    (service: ValidatorsService) => {
      let inputControl = new FormControl({ files: ['file1', 'file2', 'file3', 'file4'] })
      let result = service.maxInputFiles(inputControl);
      expect(result).toBeNull();

      inputControl = new FormControl({ files: ['file1', 'file2'] })
      result = service.maxInputFiles(inputControl);
      expect(result).toBeNull();

    }))


});
