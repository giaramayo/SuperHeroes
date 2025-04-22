import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-page',
  imports: [RouterModule],
  templateUrl: './hero-page.component.html'
})
export class HeroPageComponent {
  urlImage = input.required<string>();
  title = input.required<string>();
  mensaje = input.required<string>();
  button = input.required<string>();
  urlButton = input.required<string>();
}
