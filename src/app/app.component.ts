import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { HelpTComponent } from './help-t/help-t.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { NgModel } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,MatSidenavModule, MatToolbarModule, MatButtonModule,MatIconModule, MatListModule,MatCardModule,MatInputModule,MatFormFieldModule,FormsModule,RouterOutlet,ChatbotComponent,HelpTComponent,SettingsComponent,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chat-boat_v7c_new';
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = this.menuOpen;
  }
}
