import { Component, computed, effect, input, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Hero } from '@interface-hero/hero.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-hero-list',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule
  ],
  templateUrl: './hero-list.component.html',
  styles: `
   .color-page {
    background-color: #141c23;
   }`
})
export class HeroListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  heroes = input.required<Hero[]>();
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  displayedColumns = ['id', 'name', 'power', 'universe', 'actions'];
  dataSource = signal(new MatTableDataSource<Hero>([]));

  filteredHeroes = computed(() => {
    return this.heroes();
  });

  constructor() {
    effect(() => {
      const heroesList = this.heroes();
      const table = new MatTableDataSource<Hero>(heroesList);
      table.paginator = this.paginator;
      this.dataSource.set(table);
    });
  }
  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
  }

  onPageChanged(event: PageEvent) {
    console.log('Página cambiada', event);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();

    if (this.dataSource().paginator) {
      this.dataSource().paginator?.firstPage();
    }
  }

}
