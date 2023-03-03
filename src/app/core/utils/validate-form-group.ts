import { FormGroup } from '@angular/forms'

export function validateFormGroup(formGroup: FormGroup): boolean {
  if (formGroup.invalid) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        validateFormGroup(control)
      } else if (control.invalid) {
        control.markAsDirty()
        control.updateValueAndValidity({ onlySelf: true })
      }
    })
    return false
  }

  return true
}
