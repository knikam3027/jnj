import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../core/services/chat.service';

interface ChatSession {
  id: string;
  name: string;
  createdAt: Date;
  lastActive: Date;
  messageCount: number;
  isActive: boolean;
}

@Component({
  selector: 'app-chat-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-session.component.html',
  styleUrl: './chat-session.component.css'
})
export class ChatSessionComponent implements OnInit {
  sessions: ChatSession[] = [];
  currentSession: ChatSession | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    // TODO: Load sessions from service
    this.sessions = [
      {
        id: '1',
        name: 'Current Session',
        createdAt: new Date(),
        lastActive: new Date(),
        messageCount: 5,
        isActive: true
      }
    ];
    this.currentSession = this.sessions[0];
  }

  createNewSession(): void {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `Session ${this.sessions.length + 1}`,
      createdAt: new Date(),
      lastActive: new Date(),
      messageCount: 0,
      isActive: true
    };
    
    // Deactivate current session
    if (this.currentSession) {
      this.currentSession.isActive = false;
    }
    
    this.sessions.unshift(newSession);
    this.currentSession = newSession;
    // TODO: Notify chat service of new session
  }

  switchSession(session: ChatSession): void {
    if (this.currentSession) {
      this.currentSession.isActive = false;
    }
    session.isActive = true;
    this.currentSession = session;
    // TODO: Load session messages
  }

  deleteSession(sessionId: string): void {
    this.sessions = this.sessions.filter(s => s.id !== sessionId);
    if (this.currentSession?.id === sessionId) {
      this.currentSession = this.sessions[0] || null;
    }
  }
}
