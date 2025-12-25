import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
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
export class ChatMessagesComponent implements AfterViewChecked, OnChanges {
  @Input() messages: Message[] = [];
  @Input() isLoading = false;
  @Output() editMessage = new EventEmitter<{id: number, content: string}>();
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  editingMessageId: number | null = null;
  editedContent: string = '';
  displayedMessages: Map<number, string> = new Map();
  typingIntervals: Map<number, any> = new Map();
  private shouldScrollToBottom = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] && this.messages) {
      this.messages.forEach(message => {
        if (message.sender === 'bot' && !this.displayedMessages.has(message.id)) {
          this.shouldScrollToBottom = true;
          this.startTypingEffect(message);
        } else if (message.sender === 'user' && !this.displayedMessages.has(message.id)) {
          this.displayedMessages.set(message.id, message.content);
          this.shouldScrollToBottom = true;
        }
      });
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  }

  private startTypingEffect(message: Message): void {
    if (this.typingIntervals.has(message.id)) {
      return;
    }

    const fullText = message.content;
    let currentIndex = 0;
    this.displayedMessages.set(message.id, '');

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        this.displayedMessages.set(message.id, fullText.substring(0, currentIndex + 1));
        currentIndex++;
        this.shouldScrollToBottom = true;
      } else {
        clearInterval(interval);
        this.typingIntervals.delete(message.id);
        this.shouldScrollToBottom = false;
      }
    }, 20); // Typing speed: 20ms per character

    this.typingIntervals.set(message.id, interval);
  }

  getDisplayedContent(message: Message): string {
    return this.displayedMessages.get(message.id) || message.content;
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }

  startEdit(message: Message): void {
    this.editingMessageId = message.id;
    this.editedContent = message.content;
  }

  cancelEdit(): void {
    this.editingMessageId = null;
    this.editedContent = '';
  }

  saveEdit(messageId: number): void {
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
