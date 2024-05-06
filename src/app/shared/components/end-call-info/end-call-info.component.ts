import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { CDN_URL } from '@api/api.constants';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-end-call-info',
  standalone: true,
  imports: [],
  templateUrl: './end-call-info.component.html',
  styleUrl: './end-call-info.component.scss',
})
export class EndCallInfoComponent {
  @Input() call: any = null;
  _shared = inject(SharedService);
  copiedData: any;
  CDN_URL = CDN_URL;
  data: any;

  constructor() {}
}
