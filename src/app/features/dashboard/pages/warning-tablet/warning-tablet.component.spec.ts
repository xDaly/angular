import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningTabletComponent } from './warning-tablet.component';

describe('WarningTabletComponent', () => {
  let component: WarningTabletComponent;
  let fixture: ComponentFixture<WarningTabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarningTabletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarningTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
