import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UppercaseDirective } from './uppercase.directive';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, UppercaseDirective],
  template: `<input type="text" [formControl]="control" appUppercase />`
})
class TestComponent {
  control = new FormControl('');
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Generar texto ingresado a mayúscula', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.value = 'batman';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.control.value).toBe('BATMAN');
  });

  it('Generar texto inicial en mayúscula (si es editar)', fakeAsync(() => {
    component.control.setValue('flash');
    const directiveInstance = fixture.debugElement.query(By.directive(UppercaseDirective)).injector.get(UppercaseDirective);
    (directiveInstance as any).ngAfterViewInit();
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.value).toBe('FLASH');
  }));

});
