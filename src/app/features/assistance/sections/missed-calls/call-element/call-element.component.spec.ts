import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallElementComponent } from './call-element.component';

describe('CallElementComponent', () => {
  let component: CallElementComponent;
  let fixture: ComponentFixture<CallElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
