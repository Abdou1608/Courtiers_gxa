import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Xtlog } from '../../core/Model/xtlog.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  User: Signal<Xtlog> = inject(MAT_DIALOG_DATA).User;
  // Source simulée (remplace par le Store ou API)
 

  profileForm: FormGroup = this.fb.group({
    login: [this.User().Login],
    email: [this.User().Email],
    site: [this.User().Site],
    numtiers: [this.User().Numtiers],
    util: [this.User().Util],
    role: [this.User().Role],
    ordreext: [this.User().Ordreext],
  });

  isEditMode = false;;

  constructor() {
    console.log("From Profile Component......User Value==="+this.User().Email)
    console.log("From Profile Component Constructore......User Value==="+this.User().Email)
 
    effect(() => {
      const user = this.User();
      if (user) {
        this.profileForm.patchValue(user);
        this.profileForm.disable();
      }
    });
  }

  enableEdit() {
    this.isEditMode=true;
    this.profileForm.enable();
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('✅ Données envoyées :', this.profileForm.value);
      this.profileForm.disable();
      this.profileForm.markAsPristine();
      this.isEditMode=false;
    }
  }

  closeProfileDialog() {
    console.log('👋 Formulaire fermé');
  }
}

