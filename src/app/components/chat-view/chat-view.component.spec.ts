import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatViewComponent} from './chat-view.component';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {ChatMessage, ChatMessageType} from '../../model/chatMessage';

describe('ChatViewComponent', () => {
  let component: ChatViewComponent;
  let fixture: ComponentFixture<ChatViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatViewComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not push duplicate messages into the chat', () => {
    component.chat = [];
    const userInputA: ChatMessage = {
      text: 'test 1',
      type: ChatMessageType.USER_INPUT,
      uuid: '883d9cfc-76c6-4537-aeb5-66d4d8d24554'
    }
    const chatResponseA: ChatMessage = {
      text: 'test 1 response',
      type: ChatMessageType.CHAT_RESPONSE,
      uuid: '883d9cfc-76c6-4537-aeb5-66d4d8d24554'
    }

    component.pushMessageToChat(userInputA);
    component.pushMessageToChat(userInputA);
    expect(component.chat.length).toEqual(1);

    component.pushMessageToChat(chatResponseA);
    component.pushMessageToChat(chatResponseA);
    expect(component.chat.length).toEqual(2);
  });

  it('should match input and response messages in the chat', () => {
    component.chat = [];
    const userInputA: ChatMessage = {
      text: 'test 1',
      type: ChatMessageType.USER_INPUT,
      uuid: '883d9cfc-76c6-4537-aeb5-66d4d8d24554'
    }
    const userInputB: ChatMessage = {
      text: 'test 2',
      type: ChatMessageType.USER_INPUT,
      uuid: '2dc3fd44-77e1-4def-9fe2-b7c09c95bfbc'
    }
    const chatResponseA: ChatMessage = {
      text: 'test 1 response',
      type: ChatMessageType.CHAT_RESPONSE,
      uuid: '883d9cfc-76c6-4537-aeb5-66d4d8d24554'
    }
    const chatResponseB: ChatMessage = {
      text: 'test 2 response',
      type: ChatMessageType.CHAT_RESPONSE,
      uuid: '2dc3fd44-77e1-4def-9fe2-b7c09c95bfbc'
    }
    component.pushMessageToChat(userInputA);
    component.pushMessageToChat(userInputB);
    component.pushMessageToChat(chatResponseA);
    component.pushMessageToChat(chatResponseB);

    expect(component.chat.length).toEqual(4);
    expect(component.chat[0]).toEqual(userInputA);
    expect(component.chat[1]).toEqual(chatResponseA);
    expect(component.chat[2]).toEqual(userInputB);
    expect(component.chat[3]).toEqual(chatResponseB);
  });
});
