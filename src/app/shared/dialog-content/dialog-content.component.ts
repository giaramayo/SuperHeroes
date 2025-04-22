import { Component, inject, Inject, signal } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog-content',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-content.component.html'
})
export class DialogContentDialog  {

  private readonly _matDialog = inject(MAT_DIALOG_DATA);

  title = signal(this._matDialog.title);
  message = signal(this._matDialog.message);

}
