import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your Google API key
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  translate(text: string, targetLanguage: string): Observable<any> {
    const url = `${this.apiUrl}?key=${this.apiKey}`;
    const body = {
      q: text,
      target: targetLanguage,
      format: 'text'
    };

    return this.http.post<any>(url, body);
  }
}
