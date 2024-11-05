import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Check if running in the browser
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Set a key-value pair in localStorage
  setItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  // Get a value by key from localStorage
  getItem<T>(key: string): T | null {
    if (this.isBrowser()) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  // Remove an item by key from localStorage
  removeItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  // Clear all items from localStorage
  clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}
