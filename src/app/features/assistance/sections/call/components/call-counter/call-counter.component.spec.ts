import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCounterComponent } from './call-counter.component';

describe('CallCounterComponent', () => {
  let component: CallCounterComponent;
  let fixture: ComponentFixture<CallCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
