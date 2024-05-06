import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndCallInfoComponent } from './end-call-info.component';

describe('EndCallInfoComponent', () => {
  let component: EndCallInfoComponent;
  let fixture: ComponentFixture<EndCallInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndCallInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndCallInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
