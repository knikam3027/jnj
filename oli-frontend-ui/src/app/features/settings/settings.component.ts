import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mockSettings, mockLanguages, mockThemes } from '@core/data/mock/settings.mock';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="settings-container">
      <div class="settings-header">
        <h1 class="text-2xl font-bold text-gray-800">Settings</h1>
        <p class="text-sm text-gray-600">Manage your preferences and account settings</p>
      </div>

      <div class="settings-content">
        <!-- General Settings -->
        <div class="settings-section">
          <h2 class="section-title">General</h2>
          <div class="setting-item">
            <label class="setting-label">Language</label>
            <select [(ngModel)]="settings.general.language" (change)="saveSettings()" class="setting-select">
              <option *ngFor="let lang of languages" [value]="lang.name">
                {{ lang.flag }} {{ lang.name }}
              </option>
            </select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Timezone</label>
            <select [(ngModel)]="settings.general.timezone" (change)="saveSettings()" class="setting-select">
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Date Format</label>
            <select [(ngModel)]="settings.general.dateFormat" (change)="saveSettings()" class="setting-select">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Time Format</label>
            <select [(ngModel)]="settings.general.timeFormat" (change)="saveSettings()" class="setting-select">
              <option value="12h">12-hour</option>
              <option value="24h">24-hour</option>
            </select>
          </div>
        </div>

        <!-- Appearance -->
        <div class="settings-section">
          <h2 class="section-title">Appearance</h2>
          <div class="setting-item">
            <label class="setting-label">Theme</label>
            <div class="theme-options">
              <button
                *ngFor="let theme of themes"
                (click)="selectTheme(theme.id)"
                [class.active]="settings.appearance.theme === theme.id"
                class="theme-button"
              >
                <span class="theme-name">{{ theme.name }}</span>
                <span class="theme-description">{{ theme.description }}</span>
              </button>
            </div>
          </div>
          <div class="setting-item">
            <label class="setting-label">Font Size</label>
            <select [(ngModel)]="settings.appearance.fontSize" (change)="saveSettings()" class="setting-select">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Compact Mode</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.appearance.compactMode" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- Notifications -->
        <div class="settings-section">
          <h2 class="section-title">Notifications</h2>
          <div class="setting-item">
            <label class="setting-label">Email Notifications</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.notifications.emailNotifications" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <label class="setting-label">Push Notifications</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.notifications.pushNotifications" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <label class="setting-label">Desktop Notifications</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.notifications.desktopNotifications" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <label class="setting-label">Weekly Digest</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.notifications.weeklyDigest" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- Chat Settings -->
        <div class="settings-section">
          <h2 class="section-title">Chat</h2>
          <div class="setting-item">
            <label class="setting-label">Auto-save Conversations</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.chat.autoSave" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <label class="setting-label">Save History</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.chat.saveHistory" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <label class="setting-label">History Retention (days)</label>
            <input type="number" [(ngModel)]="settings.chat.maxHistoryDays" (change)="saveSettings()" min="1" max="365" class="setting-input">
          </div>
          <div class="setting-item">
            <label class="setting-label">Show Timestamps</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.chat.showTimestamps" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- AI Settings -->
        <div class="settings-section">
          <h2 class="section-title">AI Model</h2>
          <div class="setting-item">
            <label class="setting-label">Model</label>
            <select [(ngModel)]="settings.ai.model" (change)="saveSettings()" class="setting-select">
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5">GPT-3.5 Turbo</option>
              <option value="claude-3">Claude 3</option>
            </select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Response Length</label>
            <select [(ngModel)]="settings.ai.responseLength" (change)="saveSettings()" class="setting-select">
              <option value="concise">Concise</option>
              <option value="balanced">Balanced</option>
              <option value="detailed">Detailed</option>
            </select>
          </div>
          <div class="setting-item">
            <label class="setting-label">Context Memory</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.ai.enableContextMemory" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <!-- Privacy -->
        <div class="settings-section">
          <h2 class="section-title">Privacy</h2>
          <div class="setting-item">
            <label class="setting-label">Share Analytics</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.privacy.shareAnalytics" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
          <div class="setting-item">
            <label class="setting-label">Share Usage Data</label>
            <label class="toggle-switch">
              <input type="checkbox" [(ngModel)]="settings.privacy.shareUsageData" (change)="saveSettings()">
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="settings-footer">
        <button (click)="resetToDefaults()" class="btn-secondary">Reset to Defaults</button>
        <button (click)="saveSettings()" class="btn-primary">Save Changes</button>
      </div>

      <div *ngIf="saveMessage" class="save-message">
        {{ saveMessage }}
      </div>
    </div>
  `,
  styles: [`
    .settings-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }

    .settings-header {
      margin-bottom: 2rem;
    }

    .settings-content {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .settings-section {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e5e7eb;
    }

    .setting-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid #f3f4f6;
    }

    .setting-item:last-child {
      border-bottom: none;
    }

    .setting-label {
      font-weight: 500;
      color: #374151;
      flex: 1;
    }

    .setting-select, .setting-input {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      min-width: 200px;
    }

    .setting-select:focus, .setting-input:focus {
      outline: none;
      border-color: #C8102E;
      box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
    }

    .theme-options {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .theme-button {
      flex: 1;
      min-width: 150px;
      padding: 1rem;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
    }

    .theme-button:hover {
      border-color: #C8102E;
      background: #fef2f2;
    }

    .theme-button.active {
      border-color: #C8102E;
      background: #fef2f2;
      box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
    }

    .theme-name {
      display: block;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .theme-description {
      display: block;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 50px;
      height: 26px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #cbd5e1;
      transition: 0.3s;
      border-radius: 26px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
    }

    input:checked + .toggle-slider {
      background-color: #C8102E;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(24px);
    }

    .settings-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #e5e7eb;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #C8102E;
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background: #a00d25;
    }

    .btn-secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #f9fafb;
    }

    .save-message {
      margin-top: 1rem;
      padding: 1rem;
      background: #d1fae5;
      border: 1px solid #6ee7b7;
      border-radius: 6px;
      color: #065f46;
      text-align: center;
    }
  `]
})
export class SettingsComponent implements OnInit {
  settings = { ...mockSettings };
  languages = mockLanguages;
  themes = mockThemes;
  saveMessage = '';

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    const saved = localStorage.getItem('userSettings');
    if (saved) {
      this.settings = { ...this.settings, ...JSON.parse(saved) };
    }
  }

  saveSettings(): void {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
    this.saveMessage = 'Settings saved successfully!';
    setTimeout(() => {
      this.saveMessage = '';
    }, 3000);
  }

  selectTheme(themeId: string): void {
    this.settings.appearance.theme = themeId as any;
    this.saveSettings();
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', themeId);
  }

  resetToDefaults(): void {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      this.settings = { ...mockSettings };
      localStorage.removeItem('userSettings');
      this.saveMessage = 'Settings reset to defaults!';
      setTimeout(() => {
        this.saveMessage = '';
      }, 3000);
    }
  }
}
