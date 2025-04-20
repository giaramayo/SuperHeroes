import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Hero } from '../../models/hero';
import { FilterHeroComponent } from '../../components/filter-hero/filter-hero.component';
@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [FilterHeroComponent],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent  {

}
