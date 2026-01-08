import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked, OnChanges, SimpleChanges, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '@core/models/chat.model';

@Component({
  selector: 'app-chat-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css'],
  host: {
    'class': 'flex flex-col flex-1 overflow-hidden'
  }
})
export class ChatMessagesComponent implements AfterViewChecked, OnChanges {
  @Input() messages: Message[] = [];
  @Input() isLoading = false;
  @Output() editMessage = new EventEmitter<{id: number, content: string}>();
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  private cdr = inject(ChangeDetectorRef);

  editingMessageId: number | null = null;
  editedContent: string = '';
  displayedMessages: Map<number, string> = new Map();
  typingIntervals: Map<number, any> = new Map();
  private shouldScrollToBottom = false;
  private previousMessageCount = 0;
  private isInitialLoad = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages'] && this.messages) {
      const currentCount = this.messages.length;
      
      console.log('🔶 ngOnChanges called, message count:', currentCount);
      console.log('🔶 Messages array:', this.messages);
      
      // If this is initial load or session change (replacing all messages)
      if (this.isInitialLoad || currentCount < this.previousMessageCount) {
        console.log('🔶 Initial load or session change - showing all messages immediately');
        // Show all messages immediately without typing effect
        this.messages.forEach(message => {
          console.log('🔶 Setting message content:', message.id, message.content);
          this.displayedMessages.set(message.id, message.content);
        });
        this.isInitialLoad = false;
        this.shouldScrollToBottom = true;
      } else {
        console.log('🔶 Processing new messages from index:', this.previousMessageCount);
        // Only apply typing effect to newly added messages
        this.messages.slice(this.previousMessageCount).forEach(message => {
          console.log('🔶 New message:', message);
          if (message.sender === 'bot' && !this.displayedMessages.has(message.id)) {
            console.log('🔶 Starting typing effect for bot message, content:', message.content);
            this.shouldScrollToBottom = true;
            this.startTypingEffect(message);
          } else if (message.sender === 'user' && !this.displayedMessages.has(message.id)) {
            this.displayedMessages.set(message.id, message.content);
            this.shouldScrollToBottom = true;
          }
        });
      }
      
      this.previousMessageCount = currentCount;
    }
    
    // Detect when messages array is replaced (switching sessions)
    if (changes['messages'] && changes['messages'].previousValue && 
        changes['messages'].currentValue.length > 0 &&
        changes['messages'].previousValue.length > 0 &&
        changes['messages'].currentValue[0].id !== changes['messages'].previousValue[0].id) {
      this.isInitialLoad = true;
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
    console.log(`🔶 starting typing for MsgId: ${message.id}, length: ${fullText.length}`);
    if (!fullText) {
      this.displayedMessages.set(message.id, fullText);
      return;
    }

    let currentIndex = 0;
    this.displayedMessages.set(message.id, '');
    this.cdr.detectChanges();

    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        this.displayedMessages.set(message.id, fullText.substring(0, currentIndex + 1));
        currentIndex++;
        this.shouldScrollToBottom = true;
        this.cdr.detectChanges();
      } else {
        clearInterval(interval);
        this.typingIntervals.delete(message.id);
        this.shouldScrollToBottom = false;
        this.cdr.detectChanges();
      }
    }, 20); // Typing speed: 20ms per character

    this.typingIntervals.set(message.id, interval);
  }

  getDisplayedContent(message: Message): string {
    const displayed = this.displayedMessages.get(message.id);
    return displayed !== undefined ? displayed : message.content;
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
