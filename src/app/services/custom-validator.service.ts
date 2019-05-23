import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';

export function dateLessThanNow(): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const d1 = Date.parse(control.value);
        const d2 = Date.now();
        if (d1 < d2) {
            return {'dateLess' : true};
        }
        return null;
    };
}

export function dateEndLessStart(control: AbstractControl): { [key: string]: any } | null {
    const date_start = Date.parse(control.get('date_start').value);
    const date_end = Date.parse(control.get('date_end').value);
    if (date_end <= date_start) {
        return { 'dateEndLessStart': true};
    }
    return null;
}
