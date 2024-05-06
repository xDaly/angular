import { Component, input } from '@angular/core';
import { TabletInfoComponent } from './components/tablet-info/tablet-info.component';
import { NeedsComponent } from './components/needs/needs.component';
import { NotesComponent } from './components/notes/notes.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { Customer } from '@features/mission/store/mission/mission.state';
import { TranslateModule } from '@ngx-translate/core';
import { CDN_URL } from '@api/api.constants';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    TabletInfoComponent,
    NeedsComponent,
    NotesComponent,
    SvgIconComponent,
    TranslateModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  customer = input.required<Customer>();
  selectedMenu = 'profil';
  CDN_URL = CDN_URL
  


  calculateAge(birthdate: string): number {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
