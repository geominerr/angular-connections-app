import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const usernameValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const { value } = control;
  const regex = /^[a-zA-Z\s]+$/;

  if (!value.length) {
    return { username: 'This is required field' };
  }

  if (value.length > 40) {
    return { username: 'Shoul contain no more than 40 charasters' };
  }

  if (!value.match(regex)) {
    return { username: 'Should contain only letters and spaces' };
  }

  return null;
};
