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
