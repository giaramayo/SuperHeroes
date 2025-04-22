import { Component, inject, signal } from '@angular/core';
import { HeroListComponent } from "../../hero/components/hero-list/hero-list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { HeroService } from '@service-hero/hero.service';
import { Router, RouterModule } from '@angular/router';
import { ValidateAction } from '@interface-hero/validate-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentDialog } from '@shared/dialog-content/dialog-content.component';

@Component({
  selector: 'app-hero-consult',
  imports: [HeroListComponent, CommonModule, MatIconModule, RouterModule],
  templateUrl: './hero-consult.component.html',
  styleUrl: './hero-consult.component.css'
})
export class HeroConsultComponent {

  idValue = signal('');
  nameValue = signal('');
  search = signal(false);
  query = signal<{ id?: string; name?: string }>({});

  readonly heroService = inject(HeroService);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);

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
    const newQuery = {
      id: this.idValue().trim() || undefined,
      name: this.nameValue().trim() || undefined
    };
    this.query.set({ ...newQuery });
    this.heroResource.reload();
  }

  deleteSearch() {
    this.idValue.set('');
    this.nameValue.set('');
    this.search.set(false);
    //this.query.set({});
    this.query.set({ id: undefined, name: undefined });
    this.heroResource.reload();
  }

  accionHero(accion: ValidateAction) {
    if (accion.isEdit)
      this.router.navigate(['/edithero', accion.id]);
    else
      this.onDelete(accion.id);
  }

  onDelete(id: string): void {
      const dialogRef = this.dialog.open(DialogContentDialog, {
        data: {
          title: 'Eliminar héroe',
          message: '¿Está seguro que desea eliminar este héroe?',
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result && id) {
          this.heroService.deleteHero(id).subscribe({
            next: () => {
             console.log('Héroe eliminado:', id);
             this.deleteSearch();
            },
            error: (err) => {
              console.error('Error al eliminar héroe:', err.message);
            }
          });
        }
      });
    }
}
