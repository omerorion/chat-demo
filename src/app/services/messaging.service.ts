import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ChatMessage, ChatMessageType} from '../model/chatMessage';
import {v4 as uuidv4} from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  FAKE_CHAT_API = 'https://api.chucknorris.io/jokes/random';

  constructor(private http: HttpClient) {
  }

  private userInputSubject = new Subject<ChatMessage>();
  private chatResponseSubject = new Subject<ChatMessage>();

  handleNewUserInput(userInput: string) {
    const uuid = uuidv4();
    const userInputMessage: ChatMessage = {
      text: userInput,
      uuid,
      type: ChatMessageType.USER_INPUT
    }
    this.userInputSubject.next(userInputMessage);

    // mock response: in real scenario, would use POST request with the userInput
    this.http.get<any>(this.FAKE_CHAT_API, {}).subscribe(
      (res) => {
        this.handleNewChatResponse(res.value, uuid);
      }
    )
  }

  handleNewChatResponse(response: string, uuid: string) {
    const chatResponse: ChatMessage = {
      text: response,
      uuid,
      type: ChatMessageType.CHAT_RESPONSE
    }
    this.chatResponseSubject.next(chatResponse);
  }

  getUserInputs(): Observable<ChatMessage> {
    return this.userInputSubject.asObservable();
  }

  getChatResponses(): Observable<ChatMessage> {
    return this.chatResponseSubject.asObservable();
  }

}
