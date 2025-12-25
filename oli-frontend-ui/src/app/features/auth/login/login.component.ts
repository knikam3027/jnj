import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  isLoading = false;

  onSignIn(): void {
    console.log('onSignIn called, email:', this.email);
    
    if (!this.email || !this.isValidEmail(this.email)) {
      console.log('Email validation failed');
      return;
    }

    console.log('Starting login...');
    this.isLoading = true;
    this.authService.loginWithSSO(this.email);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onClose(): void {
    this.email = '';
  }
}
