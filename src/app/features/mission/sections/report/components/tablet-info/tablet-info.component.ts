import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tablet-info',
  standalone: true,
  imports: [NgbAccordionModule,CommonModule],
  templateUrl: './tablet-info.component.html',
  styleUrl: './tablet-info.component.scss'
})
export class TabletInfoComponent {
  isCollapsed = true;

}
