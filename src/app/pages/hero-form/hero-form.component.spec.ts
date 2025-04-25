import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '@service-hero/hero.service';
import { NotificationService } from '@service-hero/notification.service';
import { Hero } from '@interface-hero/hero.interface';
import { fakeAsync, tick } from '@angular/core/testing';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let heroServiceSpy: jasmine.SpyObj<HeroService>;
  let notificationSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    heroServiceSpy = jasmine.createSpyObj('HeroService', ['createHero', 'updateHero', 'getHeroById']);
    notificationSpy = jasmine.createSpyObj('NotificationService', ['notificationSuccess', 'notificationError', 'notificationWarning']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, HeroFormComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: NotificationService, useValue: notificationSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '2'
              }
            }
          }
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
  });

  it('Crear un héroe si el formulario es válido', fakeAsync(() => {
    component.heroForm.setValue({
      id: '',
      name: 'Spiderman',
      power: 'Volar',
      universe: 'Marvel',
    });
    expect(component.heroForm.valid).toBeTrue();
    const newHero: Hero = {
      id: '2',
      name: 'Spiderman',
      power: 'Magia',
      universe: 'Marvel',
    };
    heroServiceSpy.createHero.and.returnValue(of(newHero));
    component.onSubmit();
    tick();
    expect(heroServiceSpy.createHero).toHaveBeenCalled();
    expect(notificationSpy.notificationSuccess).toHaveBeenCalledWith('Héroe creado correctamente', 'Éxito:');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes']);
  }));

  it('Error en el servicio de héroes cuando se crea uno nuevo', fakeAsync(() => {
    component.heroForm.setValue({
      id: '',
      name: 'Flash',
      power: 'Velocidad',
      universe: 'Marvel',
    });
    heroServiceSpy.createHero.and.returnValue(throwError(() => new Error('Error al crear')));
    component.onSubmit();
    tick();
    expect(notificationSpy.notificationError).toHaveBeenCalledWith('Error al crear el héroe', 'Error:');
  }));

  it('Validar formulario es inválido', fakeAsync(() => {
    component.heroForm.setValue({
      id: '',
      name: '',
      power: '',
      universe: 'Marvel',
    });
    expect(component.heroForm.invalid).toBeTrue();
    component.onSubmit();
    tick();
    expect(heroServiceSpy.createHero).not.toHaveBeenCalled();
    expect(notificationSpy.notificationError).toHaveBeenCalledWith('Formulario inválido', 'Error:');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  }));

  it('Obtener héroe por ID y actualizar el formulario', fakeAsync(() => {
    const mockHero: Hero = {
      id: '2',
      name: 'Batman',
      power: 'Inteligencia',
      universe: 'DC'
    };
    heroServiceSpy.getHeroById.and.returnValue(of(mockHero));
    component.ngOnInit();
    tick();
    expect(heroServiceSpy.getHeroById).toHaveBeenCalledWith('2');
    expect(component.heroForm.value).toEqual(mockHero);
  }));

  it('Mostrar advertencia y redirigir si el héroe no se encuentra', fakeAsync(() => {
    heroServiceSpy.getHeroById.and.returnValue(of(undefined));
    component.ngOnInit();
    tick();
    expect(notificationSpy.notificationWarning).toHaveBeenCalledWith('No se encontró el héroe', 'Héroe NO encontrado:');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/heroes']);
  }));

});
