import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  private ngControl = inject(NgControl);

  ngAfterViewInit(): void {
    this.updateValueToUppercase();
  }

  private updateValueToUppercase(): void {
    const control = this.ngControl.control;
    const value = control?.value;
    if (value && typeof value === 'string') {
      control?.setValue(value.toUpperCase(), { emitEvent: false });
    }
  }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const uppercaseValue = input.value.toUpperCase();
    this.ngControl.control?.setValue(uppercaseValue, { emitEvent: false });
  }

}
