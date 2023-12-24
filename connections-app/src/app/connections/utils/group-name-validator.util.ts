import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const groupNameValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const { value } = control;
  const regex = /^[a-zA-Z\d\s]+$/;
  const amountMaxChars: number = 30;

  if (!value.length) {
    return { groupName: 'This is required field' };
  }

  if (value.length > amountMaxChars) {
    return {
      groupName: `Shoul contain no more than ${amountMaxChars} charasters`,
    };
  }

  if (!value.match(regex)) {
    return { groupName: 'Should contain only letters, digits and spaces' };
  }

  return null;
};
