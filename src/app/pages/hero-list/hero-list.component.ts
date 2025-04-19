import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Hero } from '../../models/hero';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [  ],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroListComponent  {
  // private heroService = inject(HeroService);
  // public heroeslist: Hero[] = signal([])

}
