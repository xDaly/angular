import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CDN_URL } from '@api/api.constants';
import { SvgsComponent } from '@shared/components/svgs/svgs.component';
import { FallbackSvgDirective } from '@shared/pipes/fallbackimage.pipe';

@Component({
  selector: 'app-call-element',
  standalone: true,
  imports: [NgOptimizedImage, SvgsComponent,FallbackSvgDirective],
  templateUrl: './call-element.component.html',
  styleUrl: './call-element.component.scss',
})
export class CallElementComponent {
  @Input() customer: any;
  CDN_URL = CDN_URL
}
