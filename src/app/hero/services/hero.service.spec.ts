import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { Hero } from '@interface-hero/hero.interface';
import heroesData from '@data-hero/heroes.json';

describe('HeroService', () => {

  let service: HeroService;
  const mockLocalStorage: Record<string, string> = {};

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return mockLocalStorage[key] ?? null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string): void => { mockLocalStorage[key] = value; });
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  // getAllHeroes
  it('getAllHeroes: Retorna todos los héroes', (done) => {
    service.getAllHeroes().subscribe((heroes) => {
      expect(heroes.length).toBeGreaterThan(0);
      expect(heroes).toEqual(jasmine.any(Array));
      done();
    });
  });

  // getHeroById
  it('getHeroById: Retorna un héroe por ID', (done) => {
    const heroId = heroesData[0].id;
    service.getHeroById(heroId).subscribe((hero) => {
      expect(hero?.id).toBe(heroId);
      done();
    });
  });
  it('getHeroById: Retorna error si el ID del héroe no existe', (done) => {
    service.getHeroById('invalid-id').subscribe({
      next: () => fail('Error al buscar héroe por ID.'),
      error: (error) => {
        expect(error.message).toContain('Héroe no encontrado');
        done();
      }
    });
  });

  // searchHeroes
  it('searchHeroes: Retorna un héroe por nombre', (done) => {
    const name = heroesData[0].name.slice(0, 3);
    service.searchHeroes(undefined, name).subscribe((result) => {
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].name.toLowerCase()).toContain(name.toLowerCase());
      done();
    });
  });

  // createHero
  it('createHero: Crea un nuevo héroe', (done) => {
    const newHero: Hero = { id: '9999', name: 'SUPERMAN', power: 'volar' };
    service.createHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
      service.getAllHeroes().subscribe((heroes) => {
        const found = heroes.find(h => h.id === '9999');
        expect(found).toBeTruthy();
        done();
      });
    });
  });

  // updateHero
  it('updateHero: Actualiza un héroe existente', (done) => {
    const heroToUpdate = { ...heroesData[0], name: 'Actualizado' };
    service.updateHero(heroToUpdate).subscribe((hero) => {
      expect(hero.name).toBe('Actualizado');
      done();
    });
  });
  it('updateHero: Retorna error al actualizar un héroe inexistente', (done) => {
    const fakeHero: Hero = { id: 'no-existe', name: 'THORT', power: 'inmortalidad' };
    service.updateHero(fakeHero).subscribe({
      next: () => fail('Ocurrio un error al actualizar el héroe.'),
      error: (error) => {
        expect(error.message).toContain('No se encontro héroe para actualizar');
        done();
      }
    });
  });

  // deleteHero
  it('deleteHero: Elimina un héroe', (done) => {
    const heroId = heroesData[1].id;
    service.deleteHero(heroId).subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });
  it('deleteHero: Retorna error al eliminar un héroe inexistente', (done) => {
    service.deleteHero('fake-id').subscribe({
      next: () => fail('Ocurrio un error al eliminar el héroe.'),
      error: (error) => {
        expect(error.message).toContain('Héroe no encontrado para eliminar');
        done();
      }
    });
  });

});
