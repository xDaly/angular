import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appSkeletonLoader]',
  standalone: true,
})
export class SkeletonLoaderDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Add skeleton loader
    const parent = this.renderer.parentNode(this.el.nativeElement);

    const skeleton = this.renderer.createElement('div');
    this.renderer.addClass(skeleton, 'skeleton-loader');
    this.renderer.insertBefore(parent, skeleton, this.el.nativeElement);

    const imgElement = this.el.nativeElement;
    this.renderer.setStyle(imgElement, 'display', 'none');

    // Add load and error event listeners
    this.renderer.listen(this.el.nativeElement, 'load', () => {
      this.renderer.removeChild(parent, skeleton);
      this.renderer.setStyle(imgElement, 'display', 'block');
    });

    this.renderer.listen(this.el.nativeElement, 'error', () => {
      this.renderer.removeChild(parent, skeleton);
      this.renderer.setStyle(imgElement, 'display', 'block');

      // Optional: Handle error state, e.g., show a fallback image or message
    });
  }
}
