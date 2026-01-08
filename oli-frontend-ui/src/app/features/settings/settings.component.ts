import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Settings</h1>
        <p class="text-sm text-gray-600">Manage your language preferences</p>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Language</h2>
        <div class="space-y-4">
          <p class="text-sm text-gray-600">Select your preferred language for AI responses:</p>
          
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              *ngFor="let lang of languages"
              (click)="selectLanguage(lang.code)"
              [class.ring-2]="currentLanguage === lang.code"
              [class.ring-red-500]="currentLanguage === lang.code"
              [class.bg-red-50]="currentLanguage === lang.code"
              class="flex items-center justify-center gap-2 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all">
              <span class="text-2xl">{{ lang.flag }}</span>
              <span class="font-medium text-gray-700">{{ lang.name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsComponent implements OnInit {
  currentLanguage = 'English';

  languages = [
    { code: 'English', name: 'English', flag: '🇺🇸' },
    { code: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
    { code: 'French', name: 'French', flag: '🇫🇷' }
  ];

  ngOnInit(): void {
    const savedLang = localStorage.getItem('app_language');
    if (savedLang) {
      this.currentLanguage = savedLang;
    }
  }

  selectLanguage(lang: string): void {
    this.currentLanguage = lang;
    localStorage.setItem('app_language', lang);
  }
}
