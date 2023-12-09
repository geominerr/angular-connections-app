import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function existEmailValidator(existEmail: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (existEmail.includes(control.value)) {
      return { existEmail: 'A user with this email already exists' };
    }

    return null;
  };
}
