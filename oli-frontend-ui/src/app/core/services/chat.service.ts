import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, delay } from 'rxjs';
import { environment } from '@environments/environment';
import { ChatSession, ChatRequest, ChatResponse, Message } from '../models/chat.model';
import mockData from '../data/mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  
  private chatSessionsSubject = new BehaviorSubject<ChatSession[]>([]);
  public chatSessions$ = this.chatSessionsSubject.asObservable();

  private currentSessionSubject = new BehaviorSubject<ChatSession | null>(null);
  public currentSession$ = this.currentSessionSubject.asObservable();

  loadChatHistory(): Observable<ChatSession[]> {
    // Mock mode for development
    if (environment.useMockData) {
      const sessions = (mockData.chatSessions as any[]).map(s => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        messages: s.messages.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        }))
      })) as ChatSession[];
      
      return of(sessions).pipe(
        delay(300),
        tap(sessions => this.chatSessionsSubject.next(sessions))
      );
    }

    return this.http.get<ChatSession[]>(`${environment.apiUrl}/chat/history`)
      .pipe(
        tap(sessions => this.chatSessionsSubject.next(sessions))
      );
  }

  sendMessage(request: ChatRequest): Observable<ChatResponse> {
    // Mock mode for development
    if (environment.useMockData) {
      const randomResponse = mockData.mockResponses[
        Math.floor(Math.random() * mockData.mockResponses.length)
      ];
      
      const botMessage: Message = {
        id: 'msg-' + Date.now(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      const mockResponse: ChatResponse = {
        message: botMessage,
        sessionId: request.sessionId || 'session-' + Date.now()
      };

      return of(mockResponse).pipe(
        delay(1000), // Simulate thinking time
        tap(response => {
          this.updateCurrentSession(response);
          this.updateSessionsList(request.message, response);
        })
      );
    }

    return this.http.post<ChatResponse>(`${environment.apiUrl}/chat/message`, request)
      .pipe(
        tap(response => {
          this.updateCurrentSession(response);
        })
      );
  }

  createNewChat(): void {
    this.currentSessionSubject.next(null);
  }

  selectSession(sessionId: string): void {
    const session = this.chatSessionsSubject.value.find(s => s.id === sessionId);
    if (session) {
      this.currentSessionSubject.next(session);
    }
  }

  private updateCurrentSession(response: ChatResponse): void {
    const current = this.currentSessionSubject.value;
    if (current) {
      current.messages.push(response.message);
      this.currentSessionSubject.next({ ...current });
    }
  }

  private updateSessionsList(userMessage: string, response: ChatResponse): void {
    const current = this.currentSessionSubject.value;
    
    if (!current) {
      // Create new session
      const newSession: ChatSession = {
        id: response.sessionId,
        title: userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const sessions = [newSession, ...this.chatSessionsSubject.value];
      this.chatSessionsSubject.next(sessions);
      this.currentSessionSubject.next(newSession);
    }
  }

  getTodaySessions(): ChatSession[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.chatSessionsSubject.value.filter(s => 
      new Date(s.createdAt) >= today
    );
  }
}
