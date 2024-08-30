import { Component } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../services/translation.service';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgSelectOption } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TranslateModule,NgIf,FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  settings = {
    theme: 'light',
    notifications: 'enabled',
    language: 'en'
  };

  notificationMessage: string = '';

  constructor(private translationService: TranslationService) {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
      this.applySettings();
    }
  }

  onSubmit(): void {
    // Save the settings to localStorage
    localStorage.setItem('settings', JSON.stringify(this.settings));

    // Apply the settings
    this.applySettings();

    // Display notification message
    this.notificationMessage = this.translationService.getTranslation('Settings saved successfully!');
    setTimeout(() => this.notificationMessage = '', 3000); // Hide after 3 seconds
  }

  applySettings(): void {
    this.applyTheme(this.settings.theme);
    this.configureNotifications(this.settings.notifications);
    this.changeLanguage(this.settings.language);
  }

  applyTheme(theme: string): void {
    document.body.className = theme; // Apply the theme to the body element
  }

  configureNotifications(notifications: string): void {
    if (notifications === 'enabled') {
      console.log('Notifications enabled');
      // Logic to enable notifications
    } else {
      console.log('Notifications disabled');
      // Logic to disable notifications
    }
  }

  changeLanguage(language: string): void {
    this.translationService.changeLanguage(language);
    console.log('Language changed to:', language);
  }
}
