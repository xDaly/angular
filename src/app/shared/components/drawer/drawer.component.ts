import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, isOpenedSelector } from '@store/store';
import { closeDrawer } from '@shared/store/shared/shared.actions';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  store = inject(Store<AppState>);
  isOpened = this.store.selectSignal(isOpenedSelector);

  constructor() {}


  closeDrawer() {
    this.store.dispatch(closeDrawer());
  }
}
