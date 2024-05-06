import { Component, Input, inject } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ToastrService } from 'ngx-toastr';
import { toastAnimations } from '@core/animations';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-missing-call-toast',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './missing-call-toast.component.html',
  styleUrl: './missing-call-toast.component.scss',
  animations: [toastAnimations.slideInRight, toastAnimations.slideOutRight],
})
export class MissingCallToastComponent {
  @Input() data: any;
  isVisible: boolean = true; // This property controls the visibility of the toast
  _toastr = inject(ToastrService);
  constructor() {}
  ngOnInit() {
    setTimeout(() => this.close(), this.data?.timeout);
  }

  close() {
    this.isVisible = false; // This should trigger the leave animation
    setTimeout(() => this.data?.action.close(), 700); // Close the toast after the animation duration
  }
}
