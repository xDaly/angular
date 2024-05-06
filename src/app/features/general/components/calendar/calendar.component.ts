import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, effect, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalendarComponent {
  weather = input.required<any>();
  datepickerTitle = 'Select Date';
  customMessage = 'You have selected';
  picktime = true;
  pickdate = true;
  pickpast = false;
  mondayfirst = true;
  selectedDate = new Date();
  selectedDay = '';
  days = [
    { long: 'Sunday', short: 'Sun' },
    { long: 'Monday', short: 'Mon' },
    { long: 'Tuesday', short: 'Tue' },
    { long: 'Wednesday', short: 'Wed' },
    { long: 'Thursday', short: 'Thu' },
    { long: 'Friday', short: 'Fri' },
    { long: 'Saturday', short: 'Sat' }
  ];
  month: any[] = [];
  monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  timeframe = 'am'; // or 'pm'
  compact = false; // This could be set based on some condition, like screen size

  constructor() {
    this.initializeMonth();
    effect(()=>{
      console.log('weather', this.weather());
      
    })
  }

  initializeMonth() {
    let date = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
    this.month = [];
    while (date.getMonth() === this.selectedDate.getMonth()) {
      this.month.push({
        dayname: date.getDay(),
        daydate: date.getDate(),
        selected: this.isSelectedDate(date),
        showday: this.pickpast || date >= new Date()
      });
      date.setDate(date.getDate() + 1);
    }
  }

  isSelectedDate(date: Date): boolean {
    return date.getDate() === this.selectedDate.getDate() &&
           date.getMonth() === this.selectedDate.getMonth() &&
           date.getFullYear() === this.selectedDate.getFullYear();
  }

  selectDate(day: any): void {
    // if (this.pickdate && day.showday) {
    //   this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), day.daydate);
    //   this.initializeMonth(); // Refresh the calendar
    // }
  }

  moveForward(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
    this.initializeMonth();
  }

  moveBack(): void {
    this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
    this.initializeMonth();
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }

  save(): void {
    // Implement save logic here
    // console.log('Date saved:', this.selectedDate);
  }

  cancel(): void {
    // Implement cancel logic here
    // console.log('Date selection cancelled');
  }

  calcOffset(day: any, index: number): string {
    if (index === 0) {
      let offset = day.dayname * 14.2857142; // Calculate percentage based on day of the week
      if (this.mondayfirst) {
        offset = ((day.dayname + 6) % 7) * 14.2857142; // Adjust for Monday first
      }
      return offset + '%';
    }
    return '0%'; // No offset for days other than the first day of the month
  }
  // Additional methods for time picking would go here

}
