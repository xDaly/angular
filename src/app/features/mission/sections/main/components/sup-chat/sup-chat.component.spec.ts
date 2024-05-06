import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupChatComponent } from './sup-chat.component';

describe('SupChatComponent', () => {
  let component: SupChatComponent;
  let fixture: ComponentFixture<SupChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
