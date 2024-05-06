import { Component } from '@angular/core';
import { CallElementComponent } from './call-element/call-element.component';

@Component({
  selector: 'app-missed-calls',
  standalone: true,
  imports: [CallElementComponent],
  templateUrl: './missed-calls.component.html',
  styleUrl: './missed-calls.component.scss',
})
export class MissedCallsComponent {
  missedCalls = [
    {
      id: '0df450f4-a50d-4936-9a1f-9160d5d5bb8a',
      first_name: 'Roger',
      last_name: 'Bornard',
      birth_date: '1955-03-19',
      gov_id: 'S0004256',
      gov_id_type: 'cin',
      registration_number: 'TUSORB9604509PA',
    },
    {
      id: 'f313c671-de92-478b-b48f-0e301a582c58',
      first_name: 'Marie',
      last_name: 'Poncy',
      birth_date: '1945-09-21',
      gov_id: 'S00125284',
      gov_id_type: 'cin',
      registration_number: 'TUSOMP3890716PA',
    },
    {
      id: '1a02edc6-9423-4680-b2e0-f0575c636a68',
      first_name: 'Evelyne',
      last_name: 'Ramu',
      birth_date: '1939-11-15',
      gov_id: 'S011456',
      gov_id_type: 'cin',
      registration_number: 'TUSOER6712389PA',
    },
  ];
}
