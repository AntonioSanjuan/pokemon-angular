import {
    AUTO_STYLE,
    animate,
    state,
    style,
    transition,
    trigger,
  } from '@angular/animations';
  
  const DEFAULT_DURATION = 500;

  export const collapseAnimation = trigger('collapse', [
    state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
    state('true', style({ height: '0', visibility: 'hidden' })),
    transition('false => true', animate(`${DEFAULT_DURATION}ms ease-in`)),
    transition('true => false', animate(`${DEFAULT_DURATION}ms ease-out`))
  ])
  