import { Component, inject, signal } from '@angular/core';
import { HeroListComponent } from "../../hero/components/hero-list/hero-list.component";
import { HeroService } from '../../hero/services/hero.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-consult',
  imports: [HeroListComponent, CommonModule],
  templateUrl: './hero-consult.component.html',
  styleUrl: './hero-consult.component.css'
})
export class HeroConsultComponent {

  private heroService = inject(HeroService);

  idValue = signal('');
  nameValue = signal('');
  search = signal(false);
  query = signal<{ id?: string; name?: string }>({});

  heroResource = rxResource({
    request: () => this.query(),
    loader: ({ request }) => {
      const { id, name } = request;
      if (!id && !name) {
        return this.heroService.getAllHeroes();
      }
      return this.heroService.searchHeroes(id, name);
    },
  });

  emitSearch() {
    this.search.set(true);
    this.query.set({
      id: this.idValue().trim() || undefined,
      name: this.nameValue().trim() || undefined
    });
    this.heroResource.reload();
  }

  deleteSearch() {
    this.idValue.set('');
    this.nameValue.set('');
    this.search.set(false);
    this.query.set({});
    this.heroResource.reload();
  }
}
