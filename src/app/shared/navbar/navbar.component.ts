import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  template: `
      <div class="navbar bg-base-100 flex justify-center">
        <div class="navbar-center">
          <a routerLink="" class="btn btn-ghost text-xl">Heroe!</a>
        </div>
      </div>
  `
})
export class NavbarComponent { }
