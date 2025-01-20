import {Component, ElementRef, ViewChild} from '@angular/core';
import {ChatMessage, ChatMessageType} from '../../model/chatMessage';
import {MessagingService} from '../../services/messaging.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-chat-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent {
  chat: ChatMessage[] = [];
  @ViewChild('chatView') chatViewRef!: ElementRef;

  constructor(private messagingService: MessagingService) {
    this.messagingService.getUserInputs().pipe(takeUntilDestroyed()).subscribe(
      (userInput) => this.pushMessageToChat(userInput)
    )
    this.messagingService.getChatResponses().pipe(takeUntilDestroyed()).subscribe(
      (chatResponse) => this.pushMessageToChat(chatResponse)
    )
  }

  pushMessageToChat(chatMessage: ChatMessage) {
    const matchingInputIndex = this.chat.findIndex(c =>
      c.uuid === chatMessage.uuid && c.type === ChatMessageType.USER_INPUT);
    if (matchingInputIndex >= 0 &&
      chatMessage.type === ChatMessageType.CHAT_RESPONSE &&
      !this.chat.find(c => c.uuid === chatMessage.uuid && c.type === ChatMessageType.CHAT_RESPONSE)
    ) {
      this.chat.splice(matchingInputIndex + 1, 0, chatMessage);
    }
    if (matchingInputIndex < 0 && chatMessage.type === ChatMessageType.USER_INPUT) {
      this.chat.push(chatMessage);
    }
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatViewRef) {
      setTimeout(() => {
        const element = this.chatViewRef.nativeElement;
        element.scrollTo({top: element.scrollHeight, behavior: 'smooth'});
      }, 1)
    }
  }

  protected readonly ChatMessageType = ChatMessageType;
}
