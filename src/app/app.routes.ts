import { Routes } from '@angular/router';
import { HeroListComponent } from './pages/hero-list/hero-list.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroModifyComponent } from './pages/hero-modify/hero-modify.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'superheroes', component: HeroListComponent },
  { path: 'modifyhero', component: HeroModifyComponent },
  { path: '**', redirectTo: '' },
];
