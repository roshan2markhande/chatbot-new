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

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule,HttpClientModule,MatIcon,NgClass,NgFor,MatToolbarModule,MatButtonModule,MatCardModule,MatInputModule,MatFormFieldModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  messages = [
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ];
  userMessage = '';

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ sender: 'user', text: this.userMessage });
      this.http.post<{ message: string }>('/api/chat', { message: this.userMessage })
        .subscribe(response => {
          this.messages.push({ sender: 'bot', text: response.message });
        });
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
