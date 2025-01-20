import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() disabled: boolean = true;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
