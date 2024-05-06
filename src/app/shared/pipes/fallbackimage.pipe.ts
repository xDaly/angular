import {
  Directive,
  ElementRef,
  HostListener,
  Input
} from '@angular/core';
import { createSVG } from '@helpers/createSVG';
@Directive({
  selector: '[appFallbackSvg]',
  standalone: true,
})
export class FallbackSvgDirective {
  @Input() appFallbackSvg: string; // This input can be used to pass a custom SVG if needed
  @Input() first_name: string;
  @Input() last_name: string;
  constructor(private el: ElementRef) {}

  @HostListener('error') onError() {
    const fallbackSvg = this.appFallbackSvg || createSVG(this.first_name, this.last_name);
    this.el.nativeElement.src = `data:image/svg+xml;base64,${btoa(
      fallbackSvg
    )}`;
  }
}
