import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-needs',
  standalone: true,
  imports: [NgbAccordionModule,CommonModule],
  templateUrl: './needs.component.html',
  styleUrl: './needs.component.scss'
})
export class NeedsComponent {
  isCollapsed = true;

}
