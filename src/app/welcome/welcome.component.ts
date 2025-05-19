import { Component, HostBinding, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { trigger, style, transition, animate } from '@angular/animations';



@Component({
  selector: 'app-courtiers-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  host: { '(click)': 'noop()' }
})
export class WelcomeComponent {
  @HostBinding('@fadeIn') fadeIn = true;
  @HostListener('document:keydown.enter', ['$event'])
handleEnter(event: KeyboardEvent) {
  this.gotologin();
}
  constructor(){}
  private router = inject(Router);
  gotologin(){
this.router.navigate(["/login"])
console.log("Navigate to Login")
  }
  noop(): void {
    return;
  }
}

