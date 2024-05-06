import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svgs',
  standalone: true,
  imports: [],
  templateUrl: './svgs.component.html',
  styleUrl: './svgs.component.scss',
})
export class SvgsComponent {
  @Input() svg: string;
  @Input() width: any;
  @Input() height: string;
  @Input() fill: string;
  @Input() stroke: string;
}
