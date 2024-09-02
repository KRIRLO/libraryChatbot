import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupedMessages, Messages, SessionResponse } from '../../interfaces/chat';
import { ChatService } from '../../services/chat_Id.service';
import { ChatsMessagesService } from '../../services/chatsMessages.service';


@Component({
  selector: 'app-chat-conversation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.css',
})
export class ChatConversationComponent implements OnInit {
  @Input() messages: SessionResponse[] = [];
  @Input() isSendMessage: boolean = false;

  messagesGrouped: GroupedMessages[] = []
  selectedChatId!: string | null;

  constructor(
    private chatService: ChatService,
    private chatsMessages: ChatsMessagesService,
  ) {}

  ngOnInit(): void {
    this.chatService.selectedChatId$.subscribe((chatId) => {
      this.selectedChatId = chatId;

      this.chatsMessages.getMessages().subscribe((messages) => {
        this.messages = messages;
          // console.log(this.messages)
          this.messagesGrouped = this.groupMessagesByDate(messages);
      });
    });


  }

  groupMessagesByDate(messagesOriginal: SessionResponse[]): GroupedMessages[] {
    // Define el array para groupedMessages
    const groupedMessages: GroupedMessages[] = [];

    messagesOriginal.forEach(element => {
        // Asegúrate de que element.datetime sea una cadena en formato "DD-MM-YYYY HH:mm:ss"
        const dateStr = String(element.datetime);

        // Divide la cadena en fecha y hora
        const [datePart, timePart] = dateStr.split(' ');

        // Extraer la fecha en formato DD-MM-YYYY
        const [day, month, year] = datePart.split('-').map(Number);

        // Extraer la hora en formato HH:mm:ss
        const [hours, minutes, seconds] = timePart.split(':').map(Number);

        // Crear un nuevo objeto Date con la fecha y la hora completa
        const timestamp = new Date(year, month - 1, day, hours, minutes, seconds);

        // Crear el mensaje del usuario y del bot
        const userMessage: Messages = {
            sender: "Usuario",
            content: element.input,
            timestamp: timestamp
        };

        const botMessage: Messages = {
            sender: "Bot",
            content: element.response,
            timestamp: timestamp
        };

        // Crear una clave de fecha en formato YYYY-MM-DD
        const dateKey = [
          year,
          (month).toString(),
          day.toString(),
        ].join('-');  // Unir con guiones


        // Buscar si ya existe un grupo con la fecha actual
        let existingGroup = groupedMessages.find(group => group.date === dateKey);

        if (!existingGroup) {
            // Si no existe un grupo para esta fecha, lo creamos
            existingGroup = {
                date: dateKey,
                messages: []
            };
            groupedMessages.push(existingGroup);
        }

        // Añadir los mensajes al grupo existente
        existingGroup.messages.push(userMessage);
        existingGroup.messages.push(botMessage);
    });

    return groupedMessages;
  }















}
