import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningCallComponent } from './warning-call.component';

describe('WarningCallComponent', () => {
  let component: WarningCallComponent;
  let fixture: ComponentFixture<WarningCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarningCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
