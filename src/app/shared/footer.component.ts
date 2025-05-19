import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary" class="footer">
      <span>&copy; {{ currentYear }} GXA Assurance — Tous droits réservés</span>
    </mat-toolbar>
  `,
  styles: [`
    .footer {
      justify-content: center;
      font-size: 0.85rem;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
