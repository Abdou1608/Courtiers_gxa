import { Component, ViewChild, TemplateRef, inject,  OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog, MatDialogContainer, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Store, provideStore, select } from '@ngrx/store';
import { AuthState } from '../store/features/auth/auth.state';
import * as AuthSelectors from '../store/features/auth/auth.selectors';
import * as AuthActions from '../store/features/auth/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { Xtlog } from '../Model/xtlog.model';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from '../store/features/auth/auth.effects';
import { authReducer } from '../store/features/auth/auth.reducer';
import { CourtierEffects } from '../store/features/courtiers/courtier.effects';
import { courtierReducer } from '../store/features/courtiers/courtier.reducer';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardActions, MatCardAvatar, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule } from '@angular/material/card';
import { Observable, tap } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatCardActions,
    MatDialogModule,
    MatDialogContainer,
    MatDialogContent,
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

      <ng-container *ngIf="user(); else loginButtons">
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

    <ng-template #profileDialog>
  <mat-dialog-container class="modal-content" [@fadeIn]>
    <mat-dialog-content>
    <mat-card>
      <mat-card-header>
        <h2>Profil Utilisateur</h2>
      </mat-card-header>
    <mat-card-content>
      <form [formGroup]="this.profileForm" (ngSubmit)="onSubmit()">
        
          <div class="form-grid" *ngIf="xtlog$ | async as user">
            <mat-form-field appearance="outline">
              <mat-label>Login</mat-label>
              <input matInput formControlName="login" [disabled]="!isEditMode" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" [disabled]="!isEditMode" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Site</mat-label>
              <input matInput formControlName="site" [disabled]="!isEditMode" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Numéro de Tiers</mat-label>
              <input matInput formControlName="numtiers" [disabled]="!isEditMode" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Portefeuille</mat-label>
              <input matInput formControlName="util" [disabled]="!isEditMode" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Rôle</mat-label>
              <input matInput formControlName="role" [disabled]="!isEditMode" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Ordre Ext.</mat-label>
              <input matInput formControlName="ordreext" [disabled]="!isEditMode" />
            </mat-form-field>
          </div>
        

        <mat-card-actions align="end">
          <button *ngIf="!isEditMode" mat-stroked-button (click)="enableEdit()">Modifier</button>
          <button *ngIf="isEditMode && profileForm.dirty" mat-raised-button color="primary" type="submit">
            Enregistrer
          </button>
          <button mat-button (click)="closeProfileDialog()">Fermer</button>
        </mat-card-actions>

      </form>
      </mat-card-content>
    </mat-card>
    </mat-dialog-content>
  </mat-dialog-container >
  </ng-template>
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
export class HeaderComponent implements OnInit {
  @ViewChild('profileDialog') profileDialog!: TemplateRef<any>;
public xtlog:Xtlog | undefined
  private dialog = inject(MatDialog);
  private store =  inject<Store<AuthState>>(Store);
  private fb = inject(FormBuilder);
  xtlog$!: Observable<Xtlog>; 
  profileForm!: FormGroup;
  isEditMode = false;
isauthenticated$=this.store.pipe(select(AuthSelectors.selectIsAuthenticated))

  user = toSignal(this.store.pipe(select(AuthSelectors.selectUserProfile)));
  ngOnInit() {
    this.xtlog$=this.store.pipe(select(AuthSelectors.selectUserProfile)).pipe(
      tap(user => {
        this.profileForm = this.fb.group({
          login: [user.login],
          email: [user.email],
          site: [user.site],
          numtiers: [user.numtiers],
          util: [user.util],
          role: [user.role],
          ordreext: [user.ordreext],
        });
        this.profileForm.disable();
      })
    );
  }
  openProfileDialog() {
    if (this.dialog.openDialogs.length === 0) {
      const dialogRef = this.dialog.open(this.profileDialog);
      setTimeout(() => dialogRef.close(), 10000);
    }
  }
  closeProfileDialog() {
    if (this.dialog.openDialogs.length !== 0) {
      this.dialog.closeAll();
  
    }
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
