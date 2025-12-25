import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sso.component.html',
  styleUrl: './sso.component.css'
})
export class SsoComponent {
  providers = [
    { id: 'google', name: 'Google', icon: 'fab fa-google' },
    { id: 'microsoft', name: 'Microsoft', icon: 'fab fa-microsoft' },
    { id: 'github', name: 'GitHub', icon: 'fab fa-github' }
  ];

  constructor(private router: Router) {}

  loginWithProvider(providerId: string): void {
    console.log(`Initiating SSO with provider: ${providerId}`);
    // TODO: Implement SSO authentication flow
    // - Redirect to OAuth provider
    // - Handle callback
    // - Exchange token
    // - Store user session
  }
}
