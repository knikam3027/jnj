import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
  host: {
    'class': 'block w-full'
  }
})
export class ChatInputComponent {
  @Output() sendMessage = new EventEmitter<string>();
  
  message = signal('');

  onSend(): void {
    const msg = this.message().trim();
    if (msg) {
      this.sendMessage.emit(msg);
      this.message.set('');
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSend();
    }
  }
}
