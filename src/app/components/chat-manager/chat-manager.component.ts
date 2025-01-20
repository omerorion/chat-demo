import { Component } from '@angular/core';
import {ChatViewComponent} from '../chat-view/chat-view.component';
import {UserInputComponent} from '../user-input/user-input.component';

@Component({
  selector: 'app-chat-manager',
  standalone: true,
  imports: [
    ChatViewComponent,
    UserInputComponent
  ],
  templateUrl: './chat-manager.component.html',
  styleUrl: './chat-manager.component.scss'
})
export class ChatManagerComponent {

}
