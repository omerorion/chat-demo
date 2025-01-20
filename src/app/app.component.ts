import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatManagerComponent} from './components/chat-manager/chat-manager.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatManagerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-chat';
}
