import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceCallsHistoryComponent } from './assistance-calls-history.component';

describe('AssistanceCallsHistoryComponent', () => {
  let component: AssistanceCallsHistoryComponent;
  let fixture: ComponentFixture<AssistanceCallsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistanceCallsHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssistanceCallsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
