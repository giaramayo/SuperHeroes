import { Component, inject, linkedSignal, effect } from '@angular/core';
import { HeroSearchInputComponent } from "../../hero/components/hero-search-input/hero-search-input.component";
import { HeroListComponent } from "../../hero/components/hero-list/hero-list.component";
import { map, of } from 'rxjs';
import { HeroService } from '../../hero/services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-consult',
  imports: [HeroSearchInputComponent, HeroListComponent, CommonModule],
  templateUrl: './hero-consult.component.html',
  styleUrl: './hero-consult.component.css'
})
export class HeroConsultComponent {

  heroService = inject(HeroService);
  activatedRoute = inject(ActivatedRoute);

  // Retrieve query param (e.g., from URL) to initialize the search
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  // Define a signal for the query parameter
  query = linkedSignal(() => this.queryParam);

  // Define a resource to fetch hero data based on the search query or retrieve all heroes if no query
  heroResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) {
        return this.heroService.getAllHeroes();  // Load all heroes if no query is provided
      }
      return this.heroService.searchHeroes(request.query);  // Otherwise, search by query
    },
  });
}
