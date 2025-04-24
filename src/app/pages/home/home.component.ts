import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroPageComponent } from "../../hero/components/hero-page/hero-page.component";

@Component({
  selector: 'app-home',
  imports: [HeroPageComponent],
  template: `
    <app-hero-page
      [urlImage]="'https://images.unsplash.com/photo-1611604548018-d56bbd85d681?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
      [title]="'Héroe!'"
      [mensaje]="'Bienvenido a esta aplicación donde podras visualizar, crear y editar superhéroes de manera dinámica.'"
      [button]="'Consultar'" [urlButton]="'/heroes'" />
  `
})
export class HomeComponent { }
