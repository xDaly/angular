import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVideoChatComponent } from './user-video-chat.component';

describe('UserVideoChatComponent', () => {
  let component: UserVideoChatComponent;
  let fixture: ComponentFixture<UserVideoChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserVideoChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserVideoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
