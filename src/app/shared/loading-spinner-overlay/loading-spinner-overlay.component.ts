import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'loading-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="overlay-container">
      <div class="translucid-overlay  w-100 h-100 d-flex justify-content-center align-items-center">
        <mat-spinner></mat-spinner>
      </div>
    </div>
  `,
  styles:  `
    .overlay-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffffc9; /* Transparencia del fondo */
      z-index: 9999; /* sobre el contenido */
    }
 `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoadingSpinnerOverlayComponent { }
