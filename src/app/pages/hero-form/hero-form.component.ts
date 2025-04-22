import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from '@service-hero/hero.service';
import { DialogContentDialog } from '@shared/dialog-content/dialog-content.component';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css'
})
export class HeroFormComponent implements OnInit {

  isEditMode = false;
  heroId: string | null = null;

  readonly dialog = inject(MatDialog);
  readonly heroService = inject(HeroService);
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  heroForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    power: ['', Validators.required],
    universe: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.heroId = id;
      this.heroService.getHeroById(id).subscribe(hero => {
        if (hero) {
          this.heroForm.patchValue(hero);
        }
      });
    }
  }

  onSubmit(): void {
    if (!this.heroForm.invalid) {
      const heroData = this.heroForm.value;
      if (this.isEditMode) {
        this.heroService.updateHero(heroData).subscribe({
          next: (updatedHero) => {
            this.routerHome();
          },
          error: (err) => {
            console.error('Error al actualizar el héroe:', err.message);
          }
        });
      } else {
        const newHero = {
          ...heroData,
          id: Math.floor(Math.random() * 10)
        };

        this.heroService.createHero(newHero).subscribe({
          next: (createdHero) => {
            console.log('Héroe creado:', createdHero);
            this.routerHome();
          },
          error: (err) => {
            console.error('Error al crear el héroe:', err.message);
          }
        });
      }
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DialogContentDialog, {
      data: {
        title: 'Eliminar héroe',
        message: '¿Está seguro que desea eliminar este héroe?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.heroId) {
        this.heroService.deleteHero(this.heroId).subscribe({
          next: () => {
            this.heroForm.reset();
            this.routerHome();
          },
          error: (err) => {
            console.error('Error al eliminar héroe:', err.message);
          }
        });
      }
    });
  }

  routerHome(): void {
    this.router.navigate(['/heroes']);
  }

}
