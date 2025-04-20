import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root',
})

export class HeroService {

  private heroes: Hero[] = [
    { id: 1, name: 'Superman', power: 'Fuerza', universe: 'DC' },
    { id: 2, name: 'Spiderman', power: 'Ágil', universe: 'Marvel' },
    { id: 3, name: 'Manolito el fuerte', power: 'Gritar', universe: 'Cómic Argento' },
  ];


}
