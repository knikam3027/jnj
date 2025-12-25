import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mockHelpTopics } from '@core/data/mock/settings.mock';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="help-container">
      <div class="help-header">
        <h1 class="text-3xl font-bold text-gray-800">Help Center</h1>
        <p class="text-gray-600 mt-2">Find answers and learn how to use OLI</p>
      </div>

      <div class="help-search">
        <input 
          type="text" 
          [(ngModel)]="searchQuery"
          (input)="filterTopics()"
          placeholder="Search for help..." 
          class="search-input"
        >
      </div>

      <div class="help-content">
        <div *ngFor="let topic of filteredTopics" class="help-topic-card">
          <div class="topic-header" (click)="toggleTopic(topic.id)">
            <div class="topic-icon">{{ topic.icon }}</div>
            <div class="topic-info">
              <h2 class="topic-title">{{ topic.title }}</h2>
              <p class="topic-description">{{ topic.description }}</p>
            </div>
            <div class="topic-arrow" [class.expanded]="expandedTopics.has(topic.id)">
              ▼
            </div>
          </div>

          <div *ngIf="expandedTopics.has(topic.id)" class="topic-articles">
            <div *ngFor="let article of topic.articles" class="article-item">
              <span class="article-bullet">•</span>
              <span class="article-title">{{ article }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="help-footer">
        <div class="contact-card">
          <h3 class="contact-title">Still need help?</h3>
          <p class="contact-text">Our support team is here to assist you</p>
          <button class="contact-button">Contact Support</button>
        </div>

        <div class="resources-card">
          <h3 class="resources-title">Additional Resources</h3>
          <ul class="resources-list">
            <li><a href="#" class="resource-link">📚 Documentation</a></li>
            <li><a href="#" class="resource-link">🎥 Video Tutorials</a></li>
            <li><a href="#" class="resource-link">💬 Community Forum</a></li>
            <li><a href="#" class="resource-link">📧 Knowledge Base</a></li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .help-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }

    .help-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .help-search {
      margin-bottom: 2rem;
    }

    .search-input {
      width: 100%;
      padding: 1rem 1.5rem;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .search-input:focus {
      outline: none;
      border-color: #C8102E;
      box-shadow: 0 0 0 4px rgba(200, 16, 46, 0.1);
    }

    .help-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .help-topic-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.2s;
    }

    .help-topic-card:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .topic-header {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .topic-header:hover {
      background: #f9fafb;
    }

    .topic-icon {
      font-size: 2.5rem;
      margin-right: 1rem;
    }

    .topic-info {
      flex: 1;
    }

    .topic-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .topic-description {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .topic-arrow {
      font-size: 0.75rem;
      color: #9ca3af;
      transition: transform 0.2s;
    }

    .topic-arrow.expanded {
      transform: rotate(180deg);
    }

    .topic-articles {
      padding: 0 1.5rem 1.5rem 5.5rem;
      border-top: 1px solid #f3f4f6;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .article-item {
      display: flex;
      align-items: flex-start;
      padding: 0.75rem 0;
      transition: all 0.2s;
      cursor: pointer;
    }

    .article-item:hover {
      padding-left: 0.5rem;
    }

    .article-item:hover .article-title {
      color: #C8102E;
    }

    .article-bullet {
      margin-right: 0.75rem;
      color: #C8102E;
      font-weight: bold;
    }

    .article-title {
      color: #374151;
      transition: color 0.2s;
    }

    .help-footer {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-top: 3rem;
    }

    .contact-card, .resources-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .contact-title, .resources-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .contact-text {
      color: #6b7280;
      margin-bottom: 1.5rem;
    }

    .contact-button {
      width: 100%;
      padding: 0.75rem 1.5rem;
      background: #C8102E;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .contact-button:hover {
      background: #a00d25;
    }

    .resources-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .resources-list li {
      margin-bottom: 0.75rem;
    }

    .resource-link {
      color: #374151;
      text-decoration: none;
      transition: color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .resource-link:hover {
      color: #C8102E;
    }
  `]
})
export class HelpComponent {
  helpTopics = mockHelpTopics;
  filteredTopics = [...this.helpTopics];
  expandedTopics = new Set<string>();
  searchQuery = '';

  toggleTopic(topicId: string): void {
    if (this.expandedTopics.has(topicId)) {
      this.expandedTopics.delete(topicId);
    } else {
      this.expandedTopics.add(topicId);
    }
  }

  filterTopics(): void {
    if (!this.searchQuery.trim()) {
      this.filteredTopics = [...this.helpTopics];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredTopics = this.helpTopics.filter((topic: any) => 
      topic.title.toLowerCase().includes(query) ||
      topic.description.toLowerCase().includes(query) ||
      topic.articles.some((article: string) => article.toLowerCase().includes(query))
    );

    // Auto-expand topics with matching articles
    this.filteredTopics.forEach((topic: any) => {
      const hasMatchingArticle = topic.articles.some((article: string) => 
        article.toLowerCase().includes(query)
      );
      if (hasMatchingArticle) {
        this.expandedTopics.add(topic.id);
      }
    });
  }
}
