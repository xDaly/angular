import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  public show: boolean = false;
  options: AnimationOptions = {
    path: '/assets/lotties/loading.json',
  };
  constructor() {}

  ngOnInit(): void {

  }

  animationCreated(animationItem: AnimationItem): void {
  }
}
