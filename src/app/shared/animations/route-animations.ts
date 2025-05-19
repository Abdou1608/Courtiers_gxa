// shared/animations/route-animations.ts
import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const slideFadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'translateY(20px)'
      })
    ], { optional: true }),

    query(':leave', [
      animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' }))
    ], { optional: true }),

    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);
