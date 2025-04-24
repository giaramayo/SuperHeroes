import { Component } from '@angular/core';
import { HeroPageComponent } from "../../hero/components/hero-page/hero-page.component";

@Component({
  selector: 'app-error-page',
  imports: [HeroPageComponent],
  template: `
    <app-hero-page
      [urlImage]="'https://images.unsplash.com/photo-1596146828740-8a0117f437e5?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
      [title]="'Error!'"
      [mensaje]="'Lo sentimos, no hemos podido encontrar la página que buscas.'"
      [button]="'Home'" [urlButton]="'/'" />
  `
})
export class ErrorPageComponent { }
