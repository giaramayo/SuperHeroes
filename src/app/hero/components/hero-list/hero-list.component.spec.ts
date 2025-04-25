import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeroListComponent } from './hero-list.component';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Hero } from '@interface-hero/hero.interface';

const heroesMock = [
  { id: 1, name: 'Batman', power: 'Detective', universe: 'DC' },
  { id: 2, name: 'Ironman', power: 'Tecnología', universe: 'Marvel' }
];

const MATERIAL = [MatTableModule, MatPaginatorModule, MatSortModule, MatTooltipModule, MatIconModule];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeroListComponent,
    MATERIAL,
    MatIconModule
  ],
  template: `<app-hero-list
                [heroes]="heroes() ?? []"
                [errorMessage]="errorMessage"
                [isEmpty]="isEmpty"
                [isLoading]="isLoading"
                (onActionHero)="accionHero($event)"
              />`
})

class HeroListaComponent {
  heroes = signal(heroesMock);
  errorMessage = signal<string | unknown | null>(null);
  isLoading = signal<boolean>(false);
  isEmpty = signal<boolean>(false);

  accionHero(event: any) {
    console.log('Acción:', event);
  }
}

describe('HeroListComponent', () => {
  let fixture: ComponentFixture<HeroListaComponent>;
  let hostComponent: HeroListaComponent;
  const dataSource = signal<Hero[]>([]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroListaComponent],
      providers: [provideAnimations()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListaComponent);
    hostComponent = fixture.componentInstance;
  });

  it('Mostrar tabla', async () => {
    hostComponent.heroes.set(heroesMock);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    // console.log('Mock de héroes:', heroesMock);
    const table = fixture.debugElement.query(By.css('table'));
    // console.log('Tabla encontrada:', table?.nativeElement);
    expect(table).toBeTruthy();
    const rows = fixture.debugElement.queryAll(By.css('table tr[mat-row]'));
    // console.log('Filas encontradas:', rows.length);
    expect(rows.length).toBe(2);
  });

});
