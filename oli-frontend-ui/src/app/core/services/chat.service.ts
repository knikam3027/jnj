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
        tap(sessions => {
          this.chatSessionsSubject.next(sessions);
          // Set first session as current if available
          if (sessions.length > 0 && !this.currentSessionSubject.value) {
            this.currentSessionSubject.next(sessions[0]);
          }
        })
      );
    }

    return this.http.get<ChatSession[]>(`${environment.apiUrl}/chat/history`)
      .pipe(
        tap(sessions => {
          this.chatSessionsSubject.next(sessions);
          // Set first session as current if available
          if (sessions.length > 0 && !this.currentSessionSubject.value) {
            this.currentSessionSubject.next(sessions[0]);
          }
        })
      );
  }

  sendMessage(request: ChatRequest): Observable<ChatResponse> {
    // Add user message to current session immediately
    const userMessage: Message = {
      id: Date.now(),
      content: request.message,
      sender: 'user',
      timestamp: new Date(),
      isEditable: true
    };

    // Update current session with user message
    const current = this.currentSessionSubject.value;
    if (current) {
      const updatedMessages = [...current.messages, userMessage];
      const updatedSession = { ...current, messages: updatedMessages };
      this.currentSessionSubject.next(updatedSession);
    }

    // Mock mode for development
    if (environment.useMockData) {
      const randomResponse = mockData.mockResponses[
        Math.floor(Math.random() * mockData.mockResponses.length)
      ];
      
      const botMessage: Message = {
        id: Date.now(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      const mockResponse: ChatResponse = {
        message: botMessage,
        sessionId: request.sessionId || Date.now()
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
          this.updateSessionsList(request.message, response);
        })
      );
  }

  createNewChat(): void {
    this.currentSessionSubject.next(null);
  }

  selectSession(sessionId: number): Observable<ChatSession | null> {
    // First try to find in local cache
    const session = this.chatSessionsSubject.value.find(s => s.id === sessionId);
    
    if (session && session.messages && session.messages.length > 0) {
      // If we already have messages, use them directly
      this.currentSessionSubject.next(session);
      return of(session);
    }

    // If no messages or not in cache, fetch from backend
    if (environment.useMockData) {
      if (session) {
        this.currentSessionSubject.next(session);
        return of(session);
      }
      return of(null);
    }

    // Fetch session messages from backend
    return this.http.get<ChatSession>(`${environment.apiUrl}/chat/session/${sessionId}`)
      .pipe(
        tap(fullSession => {
          // Update the session in the list with full messages
          const sessions = this.chatSessionsSubject.value.map(s => 
            s.id === sessionId ? fullSession : s
          );
          this.chatSessionsSubject.next(sessions);
          this.currentSessionSubject.next(fullSession);
        })
      );
  }

  private updateCurrentSession(response: ChatResponse): void {
    const current = this.currentSessionSubject.value;
    if (current) {
      // Add message to existing session
      const updatedMessages = [...current.messages, response.message];
      const updatedSession = { ...current, messages: updatedMessages };
      this.currentSessionSubject.next(updatedSession);
      
      // Update in sessions list too
      const sessions = this.chatSessionsSubject.value.map(s => 
        s.id === current.id ? updatedSession : s
      );
      this.chatSessionsSubject.next(sessions);
    }
  }

  private updateSessionsList(userMessage: string, response: ChatResponse): void {
    const current = this.currentSessionSubject.value;
    
    if (!current) {
      // Create new session with the bot response message
      const newSession: ChatSession = {
        id: response.sessionId,
        title: userMessage.substring(0, 50) + (userMessage.length > 50 ? '...' : ''),
        messages: [response.message],
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
