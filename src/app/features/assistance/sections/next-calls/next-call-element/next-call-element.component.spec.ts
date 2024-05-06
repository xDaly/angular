import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCallElementComponent } from './next-call-element.component';

describe('NextCallElementComponent', () => {
  let component: NextCallElementComponent;
  let fixture: ComponentFixture<NextCallElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextCallElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextCallElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
