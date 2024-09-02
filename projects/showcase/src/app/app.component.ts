import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBotWidgetComponent } from '../../../chat-bot-widget/src/public-api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatBotWidgetComponent,HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'showcase';
}
