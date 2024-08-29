import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'https://api.openai.com/v1/chat/completions'; 
  private apiKey = "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";  

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: "gpt-3.5-turbo",  // Use gpt-4 if available
      messages: [{ role: "user", content: message }]
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
