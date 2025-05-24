import { Component } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-auth-layout',
    imports: [RouterModule],
    template: `
      <div class="auth-container">
      <div [@routeAnimations]="getRouteAnimation(routerOutlet)" class="content">
         <router-outlet #routerOutlet="outlet"></router-outlet>
      </div>

      </div>
    `,
    styles: [`
    @keyframes animatedGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
      .auth-container {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(-45deg, #2196f3, #21cbf3, #1de9b6, #00e5ff);
  background-size: 400% 400%;
  animation: animatedGradient 12s ease infinite;
      }
    `]
  })
  export class AuthLayoutComponent {
    getRouteAnimation(outlet: RouterOutlet) {
        return outlet?.activatedRouteData?.['animation'];
      }
      
  }
  