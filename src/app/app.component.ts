import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideFadeAnimation } from './shared/animations/route-animations';

@Component({

  selector: 'app-root',
  imports: [RouterOutlet],
  standalone:true,
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
