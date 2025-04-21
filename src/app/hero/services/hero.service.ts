import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import heroesData from '@data-hero/heroes.json';
import { Hero } from '@interface-hero/hero.interface';

@Injectable({
  providedIn: 'root',
})

export class HeroService {
  private heroesCache: Hero[] = [];
  private heroByIdCache = new Map<string, Hero>();

  getAllHeroes(): Observable<Hero[]> {
    if (this.heroesCache.length > 0) {
      return of(this.heroesCache);
    }
    const heroes = heroesData as Hero[];
    this.heroesCache = heroes;
    heroes.forEach((hero) => this.heroByIdCache.set(hero.id, hero));
    return of(heroes);
  }

  searchHeroes(id?: string, name?: string): Observable<Hero[]> {
    return this.getAllHeroes().pipe(
      map((heroes) => {
        return heroes.filter((hero) => {
          const matchesId = id ? hero.id === id : true;
          const matchesName = name ? hero.name.toLowerCase().includes(name.toLowerCase()) : true;
          return matchesId && matchesName;
        });
      }),
      delay(1500), // para probar spinner
      catchError((error) => {
        console.error('Error buscando héroes:', error);
        return throwError(() => new Error('No se pudieron buscar héroes'));
      })
    );
  }

  createHero(newHero: Hero): Observable<Hero> {
    this.heroesCache.push(newHero);
    this.heroByIdCache.set(newHero.id, newHero);
    return of(newHero);
  }

  updateHero(updatedHero: Hero): Observable<Hero> {
    const index = this.heroesCache.findIndex((h) => h.id === updatedHero.id);
    if (index >= 0) {
      this.heroesCache[index] = updatedHero;
      this.heroByIdCache.set(updatedHero.id, updatedHero);
      return of(updatedHero);
    } else {
      return throwError(() => new Error('Héroe no encontrado para actualizar'));
    }
  }

  deleteHero(id: string): Observable<boolean> {
    const index = this.heroesCache.findIndex((h) => h.id === id);
    if (index >= 0) {
      this.heroesCache.splice(index, 1);
      this.heroByIdCache.delete(id);
      return of(true);
    } else {
      return throwError(() => new Error('Héroe no encontrado para eliminar'));
    }
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    const hero = this.heroByIdCache.get(id);
    return hero ? of(hero) : throwError(() => new Error('Héroe no encontrado'));
  }
}
