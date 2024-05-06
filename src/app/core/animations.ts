import {
  animate,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { slideInRight, slideOutRight } from 'ng-animate';

export const toastAnimations = {
  slideInRight: trigger('slideInRight', [
    transition(':enter', [
      style({ transform: 'translateX(100%)', opacity: 0 }),
      animate(
        '0.5s ease-in',
        style({ transform: 'translateX(0)', opacity: 1 })
      ),
    ]),
  ]),
  slideOutRight: trigger('slideOutRight', [
    transition(
      ':leave',
      useAnimation(slideOutRight, {
        params: {
          timing: 0.5,
          delay: 0,
        },
      })
    ),
  ]),
};
