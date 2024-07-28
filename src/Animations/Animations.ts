import { trigger, transition, style, query, group, animate } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  // Left/Right Slide Animations
  transition('* => isLeft', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        height: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '100%', opacity: 0 })
    ]),
    query(':leave', [
      style({ left: '0%', opacity: 1 })
    ]),
    group([
      query(':leave', [
        animate('0.5s ease-in-out', style({ left: '-100%', opacity: 0 }))
      ]),
      query(':enter', [
        animate('0.5s ease-in-out', style({ left: '0%', opacity: 1 }))
      ])
    ])
  ]),
  transition('* => isRight', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        height: '100%'
      })
    ]),
    query(':enter', [
      style({ left: '-100%', opacity: 0 })
    ]),
    query(':leave', [
      style({ left: '0%', opacity: 1 })
    ]),
    group([
      query(':leave', [
        animate('0.5s ease-in-out', style({ left: '100%', opacity: 0 }))
      ]),
      query(':enter', [
        animate('0.5s ease-in-out', style({ left: '0%', opacity: 1 }))
      ])
    ])
  ]),

  // Up/Down Slide Animations
  transition('* => isUp', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        height: '100%'
      })
    ]),
    query(':enter', [
      style({ top: '100%', opacity: 0 })
    ]),
    query(':leave', [
      style({ top: '0%', opacity: 1 })
    ]),
    group([
      query(':leave', [
        animate('0.5s ease-in-out', style({ top: '-100%', opacity: 0 }))
      ]),
      query(':enter', [
        animate('0.5s ease-in-out', style({ top: '0%', opacity: 1 }))
      ])
    ])
  ]),
  transition('* => isDown', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        height: '100%'
      })
    ]),
    query(':enter', [
      style({ top: '-100%', opacity: 0 })
    ]),
    query(':leave', [
      style({ top: '0%', opacity: 1 })
    ]),
    group([
      query(':leave', [
        animate('0.5s ease-in-out', style({ top: '100%', opacity: 0 }))
      ]),
      query(':enter', [
        animate('0.5s ease-in-out', style({ top: '0%', opacity: 1 }))
      ])
    ])
  ]),

  // Fade Animation
  transition('* => isFade', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        height: '100%'
      })
    ]),
    query(':enter', [
      style({ opacity: 0 })
    ]),
    query(':leave', [
      style({ opacity: 1 })
    ]),
    group([
      query(':leave', [
        animate('0.5s ease-in-out', style({ opacity: 0 }))
      ]),
      query(':enter', [
        animate('0.5s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ])
]);
