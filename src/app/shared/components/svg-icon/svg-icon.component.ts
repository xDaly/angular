import { Component, Input } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent {
  @Input('icon') public icon: string | undefined;
  @Input('width') public width?: any | undefined;

  constructor(public layoutService: LayoutService) {}

  getSvgType() {
    return (
      document
        .getElementsByClassName('sidebar-wrapper')[0]
        .getAttribute('icon') == 'stroke-svg'
    );
  }
}
