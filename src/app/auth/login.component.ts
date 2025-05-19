
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import * as AuthActions from '../store/features/auth/auth.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { toSignal } from '@angular/core/rxjs-interop';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Router } from '@angular/router';
import { AuthState } from '../store/features/auth/auth.state';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
   
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query('.login-card, mat-form-field, button, .error-msg', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class LoginComponent {
    private store =  inject<Store<AuthState>>(Store);
    //inject<Store<AppState>>(Store);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['Supervi', Validators.required],
    password: ['fsdfsdf', Validators.required],
    domain: ['dfsdfsfs', Validators.required]
  });
  constructor() {
    
    effect(() => {if (this.isAuthenticated()) {
       this.router.navigate(['courtiers']);}});
  }

  loading = toSignal(this.store.pipe(select(state => state?.loading)), { initialValue: true });
  error = toSignal(this.store.pipe(select(state => {
    const e = state?.error;
   // if(!e){return "Une erreur est survenue error non definit. Veuillez réessayer."}
    return e ? typeof e === 'string' ? e : 'Une erreur est survenue. Veuillez réessayer.' : '';
  })), { initialValue: '' });
  isAuthenticated = toSignal(this.store.pipe(select(state => state?.isAuthenticated ?? false)), { initialValue: false });

  submit(): void {
    console.log("In SUBMIT befor If !!!!this.loginForm.invalid==="+this.loginForm.invalid)
   
    if (this.loginForm.invalid) return;
    const { username, password, domain } = this.loginForm.value;
    console.log("User !!!!==="+username)
    console.log("passs !!!!==="+password)
    this.store.dispatch(AuthActions.login({ username: username!, password: password! , domain:domain!}));
  }


  private humanizeError(error: any): string {
    return typeof error === 'string' ? error : 'Une erreur est survenue. Veuillez réessayer.';
  }
}
