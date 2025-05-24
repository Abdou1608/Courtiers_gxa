import { Component, ViewChild, TemplateRef, inject,  OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, MatDialogContainer, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';

import * as AuthSelectors from '../core/store/auth/auth.selectors';
import * as AuthActions from '../core/store/auth/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from "./profile/profile.component";
import { AuthState } from '../core/store/auth/auth.state';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    RouterModule
]
  ,
  template: `
    <mat-toolbar color="primary" class="header">
      <div class="logo">
        <mat-icon>business</mat-icon>
        <span>GXA Courtiers</span>
      </div>

      <span class="spacer"></span>

      <ng-container *ngIf="profileSignal(); else loginButtons">
        <button mat-button (click)="logout()">Déconnexion</button>
      </ng-container>

      <ng-template #loginButtons>
        <button mat-button routerLink="/auth/login">Connexion</button>
        <button mat-raised-button color="accent" routerLink="/auth/register">Créer un compte</button>
      </ng-template>

      <mat-icon
        class="profile-icon"
        matTooltip="Profil utilisateur"
        (mouseenter)="openProfileDialog()"
        (click)="openProfileDialog()"
      >account_circle</mat-icon>

    </mat-toolbar>
 <!--  
    <ng-template #profileDialog>
  <mat-dialog-container class="modal-content" [@fadeIn]>
    <mat-dialog-content>
    <app-profile [User]="profileSignal"></app-profile>
    </mat-dialog-content>
  </mat-dialog-container >
  </ng-template>-->
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 600;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .profile-icon {
      cursor: pointer;
      margin-left: 1rem;
    }
    .modal-content {
      padding: 1rem;
      min-width: 250px;
      animation: fadeIn 0.3s ease-in;
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 8px;
}

mat-card-actions {
  justify-content: flex-end;
  gap: 8px;
}
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HeaderComponent  {
  @ViewChild('profileDialog') profileDialog!: TemplateRef<any>;
  private dialog = inject(MatDialog);
  private store =  inject<Store<AuthState>>(Store);
 // private fb = inject(FormBuilder);
 // xtlog$!: Observable<Xtlog>; 
  profileForm!: FormGroup;
  isEditMode = false;
isauthenticated$=this.store.pipe(select(AuthSelectors.selectIsAuthenticated))

  profileSignal = toSignal(this.store.pipe(select(AuthSelectors.selectUserProfile)), { initialValue: null });
  constructor(private modal: ModalService) {
   
  }
  openProfileDialog() {
    console.log("From Header Component......User Value==="+this.profileSignal()?.Email)
 
   this.modal.open(ProfileComponent, { User: this.profileSignal }, '700px') 
     
      setTimeout(() => this.modal.closeAll, 10000);
    
  }
  closeProfileDialog() {
    this.modal.closeAll
  }
  enableEdit() {
    this.isEditMode = true;
    this.profileForm.enable();
  }
  onSubmit() {
    if (this.profileForm.valid) {
      this.store.dispatch(AuthActions.UpdateProf(this.profileForm.value))
      console.log('✅ Données soumises :', this.profileForm.value);
      this.isEditMode = false;
      this.profileForm.markAsPristine();
      this.profileForm.disable();
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  editProfile() {
    console.log('TODO: redirect to profile edit page');
    // future enhancement
  }
}
