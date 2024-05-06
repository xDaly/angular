import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeathericonComponent } from '../../feathericon/feathericon.component';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [RouterModule, CommonModule, FeathericonComponent],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  public MassageData: boolean = false;

  Message() {
    this.MassageData = !this.MassageData;
  }
}
