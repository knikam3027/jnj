import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '@core/models/chat.model';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent {
  @Input() messages: Message[] = [];
  @Input() isLoading = false;
  @Output() editMessage = new EventEmitter<{id: string, content: string}>();

  editingMessageId: string | null = null;
  editedContent: string = '';

  startEdit(message: Message): void {
    this.editingMessageId = message.id;
    this.editedContent = message.content;
  }

  cancelEdit(): void {
    this.editingMessageId = null;
    this.editedContent = '';
  }

  saveEdit(messageId: string): void {
    if (this.editedContent.trim()) {
      this.editMessage.emit({ id: messageId, content: this.editedContent });
      this.editingMessageId = null;
      this.editedContent = '';
    }
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copied to clipboard!');
      // Optional: Show a toast notification
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  downloadMessage(text: string): void {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `message-${Date.now()}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
