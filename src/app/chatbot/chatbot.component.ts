import { Component ,ViewChild, ElementRef,Input} from '@angular/core';
import { NgModel} from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgClass,NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule,HttpClientModule,MatIcon,NgClass,NgFor,MatToolbarModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {

  userMessage: string = ''; 
  messages: Array<{ sender: string, text: string }> =  [{ sender: 'bot', text: 'Hello! How can I assist you today?' }
]; 

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = "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";  

  constructor(private http: HttpClient) { }

  sendMessage(): void {
    if (this.userMessage.trim()) {
      this.messages.push({ sender: 'user', text: this.userMessage });

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      });

      const body = {
        model: 'gpt-3.5-turbo', // or 'gpt-4' if using GPT-4
        messages: [{ role: 'user', content: this.userMessage }]
      };
      this.http.post<any>(this.apiUrl, body, { headers })
        .subscribe(
          response => {
            const botMessage = response.choices[0].message.content;
            this.messages.push({ sender: 'bot', text: botMessage });
          },
          error => {
            console.error('Error:', error);
            this.messages.push({ sender: 'bot', text: 'Error communicating with the server.' });
          }
        );

      this.userMessage = '';
    }
  }
  startVoiceRecognition() {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userMessage = transcript;
      this.sendMessage();
    };
  
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
    };
  
    recognition.start();
  }
}
