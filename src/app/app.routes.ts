import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeroModifyComponent } from './pages/hero-modify/hero-modify.component';
import { HeroConsultComponent } from './pages/hero-consult/hero-consult.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'superheroes', component: HeroConsultComponent },
  { path: 'modifyhero', component: HeroModifyComponent },
  { path: '**', redirectTo: '' },
];
