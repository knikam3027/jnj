import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatSettings {
  theme: 'light' | 'dark' | 'auto';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  soundEffects: boolean;
  autoSave: boolean;
  messageHistory: number;
  aiModel: string;
  temperature: number;
}

@Component({
  selector: 'app-chat-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-settings.component.html',
  styleUrl: './chat-settings.component.css'
})
export class ChatSettingsComponent implements OnInit {
  settings: ChatSettings = {
    theme: 'auto',
    fontSize: 'medium',
    notifications: true,
    soundEffects: false,
    autoSave: true,
    messageHistory: 100,
    aiModel: 'gpt-4',
    temperature: 0.7
  };

  availableModels = [
    { id: 'gpt-4', name: 'GPT-4' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
    { id: 'claude-3', name: 'Claude 3' }
  ];

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    // TODO: Load settings from local storage or API
    const savedSettings = localStorage.getItem('chatSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  saveSettings(): void {
    // TODO: Save to backend API
    localStorage.setItem('chatSettings', JSON.stringify(this.settings));
    console.log('Settings saved:', this.settings);
  }

  resetSettings(): void {
    this.settings = {
      theme: 'auto',
      fontSize: 'medium',
      notifications: true,
      soundEffects: false,
      autoSave: true,
      messageHistory: 100,
      aiModel: 'gpt-4',
      temperature: 0.7
    };
    this.saveSettings();
  }

  exportSettings(): void {
    const dataStr = JSON.stringify(this.settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chat-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  }
}
