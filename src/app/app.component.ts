import { ChangeDetectionStrategy, Component } from '@angular/core';

import { slideFadeAnimation } from './shared/animations/route-animations';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({

  selector: 'app-root',
  imports: [RouterModule],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideFadeAnimation],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Courtiers';
  getRouteAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  

}
