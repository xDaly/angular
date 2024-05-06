import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSeconds',
  standalone: true,

})
export class ConvertSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds: number = value - minutes * 60;
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }
}
