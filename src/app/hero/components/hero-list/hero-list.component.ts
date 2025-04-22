import { Component, computed, input, output, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Hero } from '@interface-hero/hero.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NotFoundComponent } from "../../../shared/not-found/not-found.component";
import { LoadingSpinnerOverlayComponent } from "../../../shared/loading-spinner-overlay/loading-spinner-overlay.component";
import { ValidateAction } from '@interface-hero/validate-data.interface';

@Component({
  selector: 'app-hero-list',
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    NotFoundComponent,
    LoadingSpinnerOverlayComponent
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

  onActionHero = output<ValidateAction>();

  displayedColumns = ['id', 'name', 'power', 'universe', 'actions'];

  dataSource = computed(() => {
    const heroesList = this.heroes();
    const dataSource = new MatTableDataSource<Hero>(heroesList);
    if (this.paginator) {
      dataSource.paginator = this.paginator;
    }
    return dataSource;
  });

  filteredHeroes = computed(() => this.heroes());

  ngAfterViewInit() {
    this.dataSource();
  }

  ngOnChanges() {
    this.dataSource().data = this.heroes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();

    if (this.dataSource().paginator) {
      this.dataSource().paginator?.firstPage();
    }
  }

  accionHero(id: string, isEdit: boolean) {
    this.onActionHero.emit({ id, isEdit });
  }

}
