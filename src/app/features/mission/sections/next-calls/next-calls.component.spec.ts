import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCallsComponent } from './next-calls.component';

describe('NextCallsComponent', () => {
  let component: NextCallsComponent;
  let fixture: ComponentFixture<NextCallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextCallsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
