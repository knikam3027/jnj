import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatService } from '@core/services/chat.service';
import { AuthService } from '@core/services/auth.service';
import { ChatSession } from '@core/models/chat.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css'],
  host: {
    'class': 'h-full block'
  }
})
export class ChatSidebarComponent implements OnInit {
  private chatService = inject(ChatService);
  private authService = inject(AuthService);
  private router = inject(Router);

  @Output() newChat = new EventEmitter<void>();

  todaySessions = signal<ChatSession[]>([]);
  allSessions = signal<ChatSession[]>([]);

  ngOnInit(): void {
    this.chatService.chatSessions$.subscribe(sessions => {
      this.allSessions.set(sessions);
      this.todaySessions.set(this.chatService.getTodaySessions());
    });
  }

  onNewChat(): void {
    this.newChat.emit();
  }

  onSelectSession(sessionId: number): void {
    this.chatService.selectSession(sessionId).subscribe({
      next: () => {
        this.router.navigate(['/chat', sessionId]);
      },
      error: (err) => {
        console.error('Error loading session:', err);
      }
    });
  }

  isInTodaySessions(sessionId: number): boolean {
    return this.todaySessions().some(s => s.id === sessionId);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
