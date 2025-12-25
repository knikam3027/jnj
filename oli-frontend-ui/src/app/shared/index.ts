/**
 * Shared Module Index
 * Exports all shared components, pipes, and utilities
 * 
 * Enterprise Pattern: Barrel Exports
 * - Single import point for shared resources
 * - Cleaner imports in feature modules
 */

// Components
export { ButtonComponent } from './components/button.component';
export { SpinnerComponent } from './components/spinner.component';
export { InputComponent } from './components/input.component';

// Pipes
export { RelativeTimePipe } from './pipes/relative-time.pipe';
export { MarkdownPipe } from './pipes/markdown.pipe';

// Utils
export * from './utils/format.utils';
export * from './utils/validation.utils';
export * from './utils/storage.utils';
