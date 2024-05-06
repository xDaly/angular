import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingCallToastComponent } from './missing-call-toast.component';

describe('MissingCallToastComponent', () => {
  let component: MissingCallToastComponent;
  let fixture: ComponentFixture<MissingCallToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingCallToastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissingCallToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
