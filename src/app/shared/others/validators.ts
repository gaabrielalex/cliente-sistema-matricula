import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Retorna null se não houver valor para permitir validações obrigatórias separadas
  }

  const date = new Date(control.value);
  if (isNaN(date.getTime())) {
    return { invalidDate: true };
  }

  return null;
}
