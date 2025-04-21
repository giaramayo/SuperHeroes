import { Component, computed, input } from '@angular/core';
import { Hero } from '../../interface/hero.interface';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-list',
  imports: [
    CommonModule,
    MatTableModule,
  ],
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent {
  heroes = input.required<Hero[]>();
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  displayedColumns = ['id', 'name', 'power', 'universe'];

  filteredHeroes = computed(() => this.heroes());
}
