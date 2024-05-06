import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabletInfoComponent } from './tablet-info.component';

describe('TabletInfoComponent', () => {
  let component: TabletInfoComponent;
  let fixture: ComponentFixture<TabletInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabletInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabletInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
