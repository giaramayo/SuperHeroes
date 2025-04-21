import { Component, effect, input, linkedSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-search-input',
  imports: [FormsModule],
  templateUrl: './hero-search-input.component.html'
})
export class HeroSearchInputComponent {
  placeholder = input('Buscar');
  debounceTime = input(1000);
  initialValue = input<string>();

  value = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  emitSearch() {
    this.value.emit(this.inputValue());
  }

}
