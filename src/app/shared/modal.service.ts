import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private dialog = inject(MatDialog);

  open<T, D = any>(component: ComponentType<T>, data?: D, width: string = '600px'): MatDialogRef<T> {
    return this.dialog.open(component, {
      width,
      data,
      disableClose: false,
      autoFocus: true
    });
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
