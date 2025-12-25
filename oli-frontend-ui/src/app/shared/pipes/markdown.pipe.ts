/**
 * Markdown Pipe
 * Converts markdown to HTML (simple implementation)
 * For production, consider using a library like marked
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Simple markdown parsing
    // For production, use a library like 'marked' or 'ngx-markdown'
    let html = value;

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Code blocks
    html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
    
    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }
}
