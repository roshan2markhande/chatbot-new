import { Routes ,RouterModule} from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { HelpTComponent } from './help-t/help-t.component';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
export const routes: Routes = [
    {path:"help-t",title:'Help',component:HelpTComponent},
    {path:"chatbot",title:'Chatbot',component:ChatbotComponent},
    {path:"menu",title:'Menu',component:MenuComponent},
    {path:"settings",title:'Settings',component:SettingsComponent},
];
