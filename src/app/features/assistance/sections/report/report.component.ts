import { Component } from '@angular/core';
import { TabletInfoComponent } from './components/tablet-info/tablet-info.component';
import { NeedsComponent } from './components/needs/needs.component';
import { NotesComponent } from './components/notes/notes.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [TabletInfoComponent, NeedsComponent, NotesComponent,SvgIconComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  selectedMenu = 'profil';
}
