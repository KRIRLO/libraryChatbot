import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SwalAlertsService } from '../services/swal-alerts.service';
import { CommunicationService } from '../services/communication.service';
import { ChatsMessagesService } from '../services/chatsMessages.service';
import { CommonModule } from '@angular/common';
import { ChatConversationComponent } from '../components/chat-conversation/chat-conversation.component';
import {
  CdkDragEnd,
  DragDropModule,
  CdkDragMove,
} from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'lib-chatBotWidget',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChatConversationComponent,
    HttpClientModule,
    DragDropModule,
  ],
  templateUrl: './chat-bot-widget.component.html',

})
export class ChatBotWidgetComponent implements OnInit {
  isChatOpen = false;
  isWidgetVisible = false;
  isDragging = false;
  messages: any[] = [];
  isUserSendingMessage = false;
  selectedChatId: string | null = null;
  dragTimeout: any;

  formChat!: FormGroup;
  chatInputs = {
    request: new FormControl('', [Validators.required]),
  };
  position= { x: 0, y: 0, bottom: 0, right: 0};
  chatPosition = { bottom: '16px', right: '16px', top: 'auto', left: 'auto' };
  chatBoxStyle: {
    bottom: string;
    right?: string;
    left?: string;
    top?: string;
  } = { bottom: '16px', right: '16px' };

  constructor(
    private communicationService: CommunicationService,
    private chatsMessages: ChatsMessagesService,
    private swalAlertsService: SwalAlertsService
  ) {}


  ngOnInit(): void {
    this.formChat = new FormGroup({
      ...this.chatInputs,
    });
  }


  toggleChat() {
    console.log('toggleChat');
    // Verificar si el widget esta visible y no se está arrastrando
    if (!this.isWidgetVisible && !this.isDragging) {
    console.log(this.isWidgetVisible, this.isDragging)

      // No Mostrar el widget y abrir el chat
      this.isWidgetVisible = true;
      this.isChatOpen = true;
    }
  }
  closedWidget(){
    // Mostrar el widget y cerrar el chat
    this.isWidgetVisible = false;
    this.isChatOpen = false;

    // Restaurar la posición del chat al valor almacenado
    this.chatPosition = {
      bottom: `${this.position.bottom}px`, // Posición inferior
      right: `${this.position.right}px`,   // Posición derecha
      top: 'auto',                         // No usar la posición superior
      left: 'auto'                         // No usar la posición izquierda
    };

  }

  onDragMoved(event: CdkDragMove): void {
    this.isDragging = true;
  }

  onDragEnded(event: CdkDragEnd): void {
    const element = event.source.getRootElement();
    const rect = element.getBoundingClientRect();

    // Guardar la nueva posición del widget después de soltarlo
    this.position = {
      x: rect.left,                               // Posición en el eje X
      y: rect.top,                                // Posición en el eje Y
      bottom: window.innerHeight - rect.bottom,   // Distancia desde el fondo de la ventana
      right: window.innerWidth - rect.right       // Distancia desde la derecha de la ventana
    };

    // Actualizar el estilo de la caja del chat con la nueva posición
    this.chatBoxStyle = {
      bottom: '16px',                        // Fija la distancia desde la parte inferior a 16px
      right: `${this.position.right}px`,     // Actualiza la distancia desde la parte derecha
      top: 'auto',                           // No usar la posición superior
      left: 'auto'                           // No usar la posición izquierda
    };

    // Finalizar el arrastre
    setTimeout(() => {
      this.isDragging = false;
    }, 0);
  }


  onSubmit() {
    this.sendMessage();
  }

  sendMessage() {
    if (this.selectedChatId && this.formChat.valid) {
      const message = this.formChat.get('request')?.value;
      this.formChat.reset();
      this.isUserSendingMessage = true;

      this.communicationService
        .sendMessage({
          language: 'español',
          request: message,
          email: localStorage.getItem('userEmail') ?? '',
          session: this.selectedChatId,
        })
        .subscribe({
          next: (response: any) => {
            this.chatsMessages.updateWhenSendMessage(message, response);
            this.updateHistorial();
            this.isUserSendingMessage = false;
          },
          error: (err) => {
            if (err.status === 429) {
              console.error(err.error.detail);
              this.swalAlertsService.messageWhitTimerError(err.error.detail);
            }
            this.isUserSendingMessage = false;
          },
        });
    } else if (this.formChat.valid) {
      const message = this.formChat.get('request')?.value;
      this.formChat.reset();
      this.isUserSendingMessage = true;

      this.communicationService
        .sendMessage({
          language: 'español',
          request: message,
          email: localStorage.getItem('userEmail') ?? '',
          session: '',
        })
        .subscribe({
          next: (response: any) => {
            this.chatsMessages.updateWhenSendMessage(message, response);
            this.updateHistorial();
            this.isUserSendingMessage = false;
          },
          error: (err) => {
            if (err.status === 429) {
              console.error(err.error.detail);
              this.swalAlertsService.messageWhitTimerError(err.error.detail);
            }
            this.isUserSendingMessage = false;
          },
        });
    }
  }

  updateHistorial() {
    this.chatsMessages.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }
}
