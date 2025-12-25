import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '@core/services/chat.service';
import { AuthService } from '@core/services/auth.service';
import { ChatSidebarComponent } from '../chat-sidebar/chat-sidebar.component';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { Message } from '@core/models/chat.model';

@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChatSidebarComponent,
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatInputComponent
  ],
  templateUrl: './chat-main.component.html',
  styleUrls: ['./chat-main.component.css']
})
export class ChatMainComponent implements OnInit {
  private chatService = inject(ChatService);
  private authService = inject(AuthService);

  messages = signal<Message[]>([]);
  isLoading = signal(false);
  currentUser = this.authService.currentUser;
  isSidebarOpen = false; // Hidden on mobile by default

  ngOnInit(): void {
    this.loadInitialData();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private loadInitialData(): void {
    // Subscribe to session changes first
    this.chatService.currentSession$.subscribe(session => {
      if (session) {
        this.messages.set(session.messages || []);
      } else {
        this.messages.set([]);
      }
    });
    
    // Then load chat history
    this.chatService.loadChatHistory().subscribe();
  }

  onSendMessage(message: string): void {
    if (!message.trim()) return;

    this.isLoading.set(true);

    this.chatService.sendMessage({ message }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error sending message:', err);
        this.isLoading.set(false);
      }
    });
  }

  onEditMessage(event: {id: number, content: string}): void {
    // Remove messages after the edited one
    const editIndex = this.messages().findIndex(m => m.id === event.id);
    if (editIndex !== -1) {
      this.messages.update(msgs => msgs.slice(0, editIndex));
    }
    // Send the edited message as a new message
    this.onSendMessage(event.content);
  }

  onNewChat(): void {
    this.chatService.createNewChat();
    this.messages.set([]);
  }
}
