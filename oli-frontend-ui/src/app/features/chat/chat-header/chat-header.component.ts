import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent implements OnInit {
  @Input() userName = 'John Smith';
  @Output() toggleSidebar = new EventEmitter<void>();
  showDropdown = false;
  currentLanguage = 'English';

  languages = [
    { code: 'English', name: 'English', flag: '🇺🇸' },
    { code: 'Spanish', name: 'Spanish', flag: '🇪🇸' },
    { code: 'Portuguese', name: 'Portuguese', flag: '🇵🇹' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('app_language');
    if (savedLang) {
      this.currentLanguage = savedLang;
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectLanguage(lang: string): void {
    this.currentLanguage = lang;
    localStorage.setItem('app_language', lang);
    // Optional: Reload or trigger language change event
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
    this.showDropdown = false;
  }

  navigateToHelp(): void {
    this.router.navigate(['/help']);
    this.showDropdown = false;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigate(['/login']);
    this.showDropdown = false;
  }
}
