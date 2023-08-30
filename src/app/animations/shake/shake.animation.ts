   import {
    animate,
    keyframes,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';
  
  const DEFAULT_DURATION = 500;

  export const shakeAnimation = trigger('shake', [
    transition('false => true', [
      animate('0.3s', keyframes([
        style({ transform: 'translateY(0)', offset: 0 }),
        style({ transform: 'translateY(-10px)', offset: 0.5 }),
        style({ transform: 'translateY(0)', offset: 1 })
      ]))
    ]),
  ])
  