import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {
  constructor(private authenticationService: AuthenticationService) {}
  static email(control: FormControl): ValidationErrors | null {
    const emailPattern = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+(.[a-zA-Z]{2,})+$/;
    return emailPattern.test(control.value) ? null : { email: true };
  }

  static toggleRequiredTrue(control: FormControl): ValidationErrors | null {
    return control.value ? null : { toggleRequired: true };
  }

  static matchFieldsValidator(field1Name: string, field2Name: string) {
    return (formGroup: FormGroup) => {
      const field1 = formGroup.get(field1Name);
      const field2 = formGroup.get(field2Name);

      if (field1?.value !== field2?.value) {
        field2?.setErrors({ mismatch: true });
      } else {
        field2?.setErrors(null);
      }
    };
  }

  static numberValidator(control: FormControl): ValidationErrors | null {
    const numberPattern = /^[0-9]*$/;
    if (!control.value) return null;
    return numberPattern.test(control.value) ? null : { number: true };
  }

  static repetedEmailValidator(isRepeted: boolean): ValidatorFn {
    return (): Record<string, any> | null => {
      return isRepeted ? { repeted: true } : null;
    };
  }

  checkEmailExistss(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (!email) return null;
    return this.authenticationService.checkEmailExists(email);
  }

  checkEmailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      if (!email) return of(null);
      return this.authenticationService.checkEmailExists(email).pipe(
        map((exists: boolean) => {
          return exists ? { emailExists: true } : null;
        })
      );
    };
  }
}
