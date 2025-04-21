import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroConsultComponent } from './pages/hero-consult/hero-consult.component';
import { HeroFormComponent } from './pages/hero-form/hero-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'superheroes', component: HeroConsultComponent },
  { path: 'formulariohero', component: HeroFormComponent },
  { path: '**', redirectTo: '' },
];
