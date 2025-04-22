import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroConsultComponent } from './pages/hero-consult/hero-consult.component';
import { HeroFormComponent } from './pages/hero-form/hero-form.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'heroes', component: HeroConsultComponent },
  { path: 'nuevohero', component: HeroFormComponent },
  { path: 'edithero/:id', component: HeroFormComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];
