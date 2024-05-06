import { Component } from '@angular/core';
import { ConvertSecondsPipe } from '@shared/pipes/convertSeconds.pipe';

@Component({
  selector: 'app-call-counter',
  standalone: true,
  imports: [ConvertSecondsPipe],
  templateUrl: './call-counter.component.html',
  styleUrl: './call-counter.component.scss',
})
export class CallCounterComponent {
  green = '#17AD37';
  red = '#FF0000';
  date = new Date();
  duration = 0;
  constructor() {
    setInterval(() => {
      this.green = this.green === '#17AD37' ? '#a5f3b6' : '#17AD37';
    }, 500);
    setInterval(() => {
      this.red = this.red === '#FF0000' ? '#f3b6b6' : '#FF0000';
    }, 500);
    setInterval(() => {
      this.duration++;
    }, 1000);
  }
}
