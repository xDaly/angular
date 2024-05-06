import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CDN_URL } from '@api/api.constants';
import { SvgsComponent } from '@shared/components/svgs/svgs.component';
import { FallbackSvgDirective } from '@shared/pipes/fallbackimage.pipe';
import { SkeletonLoaderDirective } from '@shared/pipes/sekeletonLoader.pipe';
@Component({
  selector: 'app-next-call-element',
  standalone: true,
  imports: [
    NgOptimizedImage,
    SvgsComponent,
    FallbackSvgDirective,
    SkeletonLoaderDirective,
  ],
  templateUrl: './next-call-element.component.html',
  styleUrl: './next-call-element.component.scss',
})
export class NextCallElementComponent {
  CDN_URL = CDN_URL;
  @Input() call: any;
  constructor() {}
}
