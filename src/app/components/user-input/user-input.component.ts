import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../button/button.component';
import {MessagingService} from '../../services/messaging.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.scss'
})
export class UserInputComponent {

  constructor(private messagingService: MessagingService) {
  }

  userInput: string = '';
  disableButton: boolean = true;

  @ViewChild('textAreaElement') textAreaRef?: ElementRef;

  onSendMessage() {
    this.checkDisabled();
    if (this.disableButton) {
      return;
    }
    this.messagingService.handleNewUserInput(this.userInput.trim());
    this.userInput = '';
    this.textAreaRef?.nativeElement.focus();
  }

  onEnter(event: Event) {
    event.preventDefault();
    this.onSendMessage();
  }

  checkDisabled() {
    this.disableButton = this.userInput.trim().length === 0;
  }
}
