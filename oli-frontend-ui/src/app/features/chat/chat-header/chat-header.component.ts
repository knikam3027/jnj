import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.css']
})
export class ChatHeaderComponent {
  @Input() userName = 'John Smith';
  @Output() toggleSidebar = new EventEmitter<void>();
  showDropdown = false;

  constructor(private router: Router) {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
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
