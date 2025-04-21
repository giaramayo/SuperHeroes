import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  template: `
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <a routerLink="/" class="btn btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v6m4-6v6m5-6l2 2m-2-2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6"/>
          </svg>
        </a>
      </div>
      <div routerLink="/" class="navbar-center">
        <a class="btn btn-ghost text-xl">Heroe!</a>
      </div>
      <div class="navbar-end">
        <div class="w-12"></div>
      </div>
    </div>
`
})
export class NavbarComponent { }
