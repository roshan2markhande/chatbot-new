import { Component, inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgSelectOption } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf,FormsModule,HttpClientModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  private http = inject(HttpClient);  // Use Angular’s injection system for standalone components

  settings = {
    theme: 'light',
    notifications: 'enabled',
    language: 'en'
  };

  notificationMessage: string = '';
  apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API key

  constructor() {
    this.loadSettings();
  }

  loadSettings(): void {
    this.applySettings();
  }

  onSubmit(): void {
    this.applySettings();

  //   this.translateText('Settings saved successfully!', this.settings.language).subscribe(
  //     (response: any) => {
  //       this.notificationMessage = response.data.translations[0].translatedText;
  //       setTimeout(() => this.notificationMessage = '', 3000); // Hide after 3 seconds
  //     },
  //     error => {
  //       console.error('Error translating text:', error);
  //     }
  //   );
  }

  applySettings(): void {
    this.applyTheme(this.settings.theme);
    this.configureNotifications(this.settings.notifications);
   // this.changeLanguage(this.settings.language);
  }

  applyTheme(theme: string): void {
    document.body.className = theme;
  }

  configureNotifications(notifications: string): void {
    console.log(notifications === 'enabled' ? 'Notifications enabled' : 'Notifications disabled');
  }

  changeLanguage(language: string): void {
    // Apply language changes (if needed)
  }

  // translateText(text: string, targetLanguage: string) {
  //   const url = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`;
  //   const body = {
  //     q: text,
  //     target: targetLanguage,
  //     format: 'text'
  //   };

  //   return this.http.post(url, body);
  // }

}
