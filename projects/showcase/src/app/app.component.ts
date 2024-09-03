import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBotWidgetComponent } from '../../../chat-bot-widget/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatBotWidgetComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'showcase';
}
