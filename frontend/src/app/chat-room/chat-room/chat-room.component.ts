import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  constructor(private _chatService:ChatService) { }

  ngOnInit(): void {
  }

}
