import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective {
  @HostBinding('class.draggable') draggable = true;

  // to trigger pointer-events polyfill
  @HostBinding('attr.touch-action') touchAction = 'none';

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.dragging') dragging = false;

  @Input() helper: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.dragging = true;
    this.dragStart.emit(event);

    this.viewContainerRef.createEmbeddedView(this.helper);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragMove.emit(event);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }

    this.dragging = false;
    this.dragEnd.emit(event);

    this.viewContainerRef.clear();
  }
}
