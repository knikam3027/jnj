import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../core/services/chat.service';

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: Date;
  messageCount: number;
  preview: string;
}

@Component({
  selector: 'app-chat-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css'
})
export class ChatHistoryComponent implements OnInit {
  chatHistory: ChatHistoryItem[] = [];
  isLoading = false;
  selectedChatId: string | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadChatHistory();
  }

  /**
   * Return a user-friendly title for the history entry.
   * If the stored title appears to be a system instruction (e.g. starts with "[System:"),
   * prefer the first user message content as the title (truncated). Otherwise return stored title.
   */
  getDisplayTitle(chat: ChatHistoryItem): string {
    if (!chat || !chat.title) return 'New Chat';
    const sysPrefix = '[System:';
    if (chat.title.startsWith(sysPrefix)) {
      // Try to extract a better title from preview or fallback
      if (chat.preview && chat.preview.trim().length > 0) {
        return chat.preview.length > 60 ? chat.preview.substring(0, 60) + '...' : chat.preview;
      }
      // Fallback to stripping the system prefix
      const endIdx = chat.title.indexOf(']');
      if (endIdx > 0 && endIdx < chat.title.length - 1) {
        const rest = chat.title.substring(endIdx + 1).trim();
        return rest.length ? (rest.length > 60 ? rest.substring(0, 60) + '...' : rest) : 'New Chat';
      }
      return 'New Chat';
    }
    return chat.title.length > 60 ? chat.title.substring(0, 60) + '...' : chat.title;
  }

  loadChatHistory(): void {
    this.isLoading = true;
    // TODO: Implement actual chat history loading from service
    // this.chatService.getChatHistory().subscribe(...)
    
    // Mock data for now
    setTimeout(() => {
      this.chatHistory = [
        {
          id: '1',
          title: 'Project Discussion',
          timestamp: new Date(),
          messageCount: 15,
          preview: 'Let\'s discuss the new features...'
        }
      ];
      this.isLoading = false;
    }, 500);
  }

  selectChat(chatId: string): void {
    this.selectedChatId = chatId;
    // TODO: Load selected chat conversation
  }

  deleteChat(chatId: string): void {
    // TODO: Implement chat deletion
    this.chatHistory = this.chatHistory.filter(chat => chat.id !== chatId);
  }
}
