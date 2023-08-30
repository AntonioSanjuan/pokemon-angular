import {
    AUTO_STYLE,
    animate,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';
  
  const DEFAULT_DURATION = 200;

  export const rotateAnimation = trigger('rotate', [
    state('false', style({ transform: 'rotate(0)' })),
    state('true', style({ transform: 'rotate(180deg)' })),
    transition('false => true', animate(`${DEFAULT_DURATION}ms ease-in`)),
    transition('true => false', animate(`${DEFAULT_DURATION}ms ease-out`))
  ])
  