import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroConsultComponent } from './hero-consult.component';
import { HeroService } from '@service-hero/hero.service';
import { NotificationService } from '@service-hero/notification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('HeroConsultComponent', () => {
  let component: HeroConsultComponent;
  let fixture: ComponentFixture<HeroConsultComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getAllHeroes', 'searchHeroes', 'deleteHero']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['notificationError', 'notificationSuccess']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [HeroConsultComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ActivatedRoute, useValue: { params: of({}), queryParams: of({}) } },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroConsultComponent);
    component = fixture.componentInstance;
    heroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    component.idValue = signal('');
    component.nameValue = signal('');
    component.search = signal(false);
    component.query = signal({});
    component.heroResource = {
      isLoading: () => false,
      reload: jasmine.createSpy('reload'),
      value: () => [],
      error: () => null
    } as any;

    fixture.detectChanges();
  });

  it('Crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('Se actualiza la consulta y se actualiza a heroResource', () => {
    component.idValue.set('5');
    component.nameValue.set('Superman');
    component.emitSearch();
    expect(component.query()).toEqual({ id: '5', name: 'Superman' });
    expect(component.heroResource.reload).toHaveBeenCalled();
  });

  it('Se limpian los filtros y se actualiza a heroResource', () => {
    component.idValue.set('2');
    component.nameValue.set('Batman');
    component.search.set(true);
    component.deleteSearch();
    expect(component.idValue()).toBe('');
    expect(component.nameValue()).toBe('');
    expect(component.query()).toEqual({});
    expect(component.search()).toBeFalse();
    expect(component.heroResource.reload).toHaveBeenCalled();
  });

  it('Se edita un héroe y se redirecciona para edición', () => {
    const action = { isEdit: true, id: '3' };
    component.accionHero(action);
    expect(router.navigate).toHaveBeenCalledWith(['/edithero', '3']);
  });

  it('Se ejecuta onDelete cuando isEdit es false', () => {
    const action = { isEdit: false, id: '4' };
    spyOn(component, 'onDelete');
    component.accionHero(action);
    expect(component.onDelete).toHaveBeenCalledWith('4');
  });

  it('Se muestra diálogo cuando se elimina héroe correctamente', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    dialog.open.and.returnValue(dialogRefSpyObj);
    heroService.deleteHero.and.returnValue(of(true));
    component.onDelete('9');
    expect(dialog.open).toHaveBeenCalled();
    expect(heroService.deleteHero).toHaveBeenCalledWith('9');
    expect(notificationService.notificationSuccess).toHaveBeenCalledWith('Héroe eliminado correctamente', 'Éxito');
  });

  it('Error al eliminar héroe y se muestra diálogo de error', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    dialog.open.and.returnValue(dialogRefSpyObj);
    heroService.deleteHero.and.returnValue(of(false));
    component.onDelete('10');
    expect(notificationService.notificationError).toHaveBeenCalledWith('Error al eliminar héroe', 'Error');
  });
});
