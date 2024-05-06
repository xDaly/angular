import { Component, ElementRef, ViewChild } from '@angular/core';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-sup-chat',
  standalone: true,
  imports: [SvgIconComponent, MessageComponent],
  templateUrl: './sup-chat.component.html',
  styleUrl: './sup-chat.component.scss',
})
export class SupChatComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  private mutationObserver: MutationObserver;

  messages: any[] = [
    {
      text: 'Hello, how can I help you?',
      date: new Date(),
      sender: 'agent',
    },
    {
      text: 'I have a problem with my order',
      date: new Date(),
      sender: 'user',
    },
    {
      text: 'I have a problem with my order',
      date: new Date(),
      sender: 'user',
    },
    {
      text: 'I have a problem with my order',
      date: new Date(),
      sender: 'user',
    },
    {
      text: 'I have a problem with my order',
      date: new Date(),
      sender: 'user',
    },
    {
      text: 'Hello, how can I help you?',
      date: new Date(),
      sender: 'agent',
    },
    {
      text: 'Hello, how can I help you?',
      date: new Date(),
      sender: 'agent',
    },
  ];

  ngAfterViewInit() {
    this.setupMutationObserver();
  }

  setupMutationObserver() {
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.chatContainer.nativeElement.scrollTop =
            this.chatContainer.nativeElement.scrollHeight;
        }
      });
    });
    this.mutationObserver.observe(this.chatContainer.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  ngOnDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
  send() {
    this.messages.push({
      text: 'Hello, how can I help you?',
      date: new Date(),
      sender: 'agent',
    });
  }
}
