import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Hero } from '@interface-hero/hero.interface';
import heroesData from '@data-hero/heroes.json';

const STORAGE_KEY = 'heroes_app_data';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesCache: Hero[] = [];
  private heroByIdCache = new Map<string, Hero>();

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.heroesCache = JSON.parse(saved);
    } else {
      this.heroesCache = heroesData;
      this.syncLocalStorage();
    }

    this.heroesCache.forEach(h => this.heroByIdCache.set(h.id, h));
  }

  private syncLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.heroesCache));
  }

  getAllHeroes(): Observable<Hero[]> {
    return of(this.heroesCache);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    const hero = this.heroByIdCache.get(id);
    return hero ? of(hero) : throwError(() => new Error('Héroe no encontrado'));
  }

  searchHeroes(id?: string, name?: string): Observable<Hero[]> {
    return this.getAllHeroes().pipe(
      map((heroes) =>
        heroes.filter((hero) => {
          const matchesId = id ? hero.id === id : true;
          const matchesName = name ? hero.name.toLowerCase().includes(name.toLowerCase()) : true;
          return matchesId && matchesName;
        })
      ),
      delay(1500),
      catchError((error) => {
        console.error('Error buscando héroes:', error);
        return throwError(() => new Error('No se pudieron buscar héroes'));
      })
    );
  }

  createHero(newHero: Hero): Observable<Hero> {
    this.heroesCache.push(newHero);
    this.heroByIdCache.set(newHero.id, newHero);
    this.syncLocalStorage();
    return of(newHero);
  }

  updateHero(updatedHero: Hero): Observable<Hero> {
    const index = this.heroesCache.findIndex(h => h.id === updatedHero.id);
    if (index >= 0) {
      this.heroesCache[index] = updatedHero;
      this.heroByIdCache.set(updatedHero.id, updatedHero);
      this.syncLocalStorage();
      return of(updatedHero);
    } else {
      return throwError(() => new Error('Héroe no encontrado para actualizar'));
    }
  }

  deleteHero(id: string): Observable<boolean> {
    console.log('Eliminando héroe con ID:', id);
    const index = this.heroesCache.findIndex(h => h.id === id);
    if (index >= 0) {
      this.heroesCache.splice(index, 1);
      this.heroByIdCache.delete(id);
      this.syncLocalStorage();
      return of(true);
    } else {
      return throwError(() => new Error('Héroe no encontrado para eliminar'));
    }
  }
}
