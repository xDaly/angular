import {
  Directive,
  QueryList,
  ElementRef,
  ContentChildren,
  AfterContentInit,
  inject,
} from '@angular/core';
import { MovableDirective } from './movable.directive';
import { map, switchMap } from 'rxjs/operators';
import { DraggableDirective } from './draggable.directive';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

@Directive({
  selector: '[appMovableArea]',
  standalone: true,
})
export class MovableAreaDirective
  extends DraggableDirective
  implements AfterContentInit
{
  @ContentChildren(MovableDirective) movableList: QueryList<MovableDirective>;

  private boundaries: Boundaries;
  el = inject(ElementRef);

  ngAfterContentInit(): void {
    const subs: any = [];

    this.movableList.changes.subscribe((movables) => {
      // console.log(movables);
      if (subs.length) {
        subs.forEach((sub: any) => sub.unsubscribe());
      }
      movables.forEach((movable: any) => {
        subs.push(
          movable.dragStart.subscribe(() => this.measureBoundaries(movable))
        );
        subs.push(
          movable.dragMove.subscribe(() => this.maintainBoundaries(movable))
        );
      });
    });

    this.movableList.notifyOnChanges();
  }

  private measureBoundaries(movable: MovableDirective) {
    // console.log('drag started...');
    const viewRect: ClientRect = this.el.nativeElement.getBoundingClientRect();
    const movableClientRect: ClientRect =
      movable.element.nativeElement.getBoundingClientRect();

    this.boundaries = {
      minX: viewRect.left - movableClientRect.left + movable.position.x,
      maxX: viewRect.right - movableClientRect.right + movable.position.x,
      minY: viewRect.top - movableClientRect.top + movable.position.y,
      maxY: viewRect.bottom - movableClientRect.bottom + movable.position.y,
    };
  }

  private maintainBoundaries(movable: MovableDirective) {
    if (movable.position.x < this.boundaries.minX)
      movable.position.x = this.boundaries.minX;
    if (movable.position.x > this.boundaries.maxX)
      movable.position.x = this.boundaries.maxX;
    if (movable.position.y < this.boundaries.minY)
      movable.position.y = this.boundaries.minY;
    if (movable.position.y > this.boundaries.maxY)
      movable.position.y = this.boundaries.maxY;
  }
}
