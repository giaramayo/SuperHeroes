import { Component } from '@angular/core';
import { HeroPageComponent } from "../../hero/components/hero-page/hero-page.component";

@Component({
  selector: 'app-error-page',
  imports: [HeroPageComponent],
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent { }
