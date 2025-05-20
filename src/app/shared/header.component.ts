import { Component, ViewChild, TemplateRef, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule
  ],
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
      <div class="modal-content" [@fadeIn]>
        <h2>Profil Utilisateur</h2>
        <p *ngIf="isauthenticated$ | async">
          <strong>Login:</strong> {{ user()?.login }}<br />
          <strong>Email:</strong> {{ user()?.email || '-' }}<br />
          <strong>Raison Sociale:</strong> {{ user()?.rsociale || '-' }}<br />
          <strong>Dossier:</strong> {{ user()?.dossier || '-' }}<br />
          <strong>Portefeuille:</strong> {{ user()?.portef || '-' }}<br />
          <strong>Rôle:</strong> {{ user()?.role || '-' }}<br />
          <strong>Ordre Ext.:</strong> {{ user()?.ordreext || '-' }}<br />
        </p>
        <div class="modal-actions">
          <button mat-button (click)="editProfile()">Modifier</button>
          <button mat-button (click)="this.closeProfileDialog()">Fermer</button>
        </div>
      </div>
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
export class HeaderComponent {
  @ViewChild('profileDialog') profileDialog!: TemplateRef<any>;

  private dialog = inject(MatDialog);
  private store = inject(Store<AuthState>);
isauthenticated$=this.store.pipe(select(AuthSelectors.selectIsAuthenticated))
  user = toSignal(this.store.pipe(select(AuthSelectors.selectUserProfile)));

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

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  editProfile() {
    console.log('TODO: redirect to profile edit page');
    // future enhancement
  }
}
