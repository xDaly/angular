import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'custom-menu',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, RouterModule,TranslateModule],
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.scss'],
})
export class CustomMenuComponent {
  @Input() icon: string = '';
  @Input() name: string = '';
  @Input() route: string = '';
  @Input() width: any;
}
