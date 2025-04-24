import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private ngControl: NgControl) { }

  ngOnInit(): void {
    const value = this.ngControl.control?.value;
    if (value && typeof value === 'string') {
      this.ngControl.control?.setValue(value.toUpperCase(), { emitEvent: false });
    }
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const uppercaseValue = input.value.toUpperCase();
    this.ngControl.control?.setValue(uppercaseValue, { emitEvent: false });
  }

}
