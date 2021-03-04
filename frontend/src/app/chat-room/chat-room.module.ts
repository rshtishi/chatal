import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoomRoutingModule } from './chat-room-routing.module';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { InboxChatComponent } from './chat-room/inbox-chat/inbox-chat.component';
import { InboxSearchComponent } from './chat-room/inbox-search/inbox-search.component';


@NgModule({
  declarations: [ChatRoomComponent, InboxChatComponent, InboxSearchComponent],
  imports: [
    CommonModule,
    ChatRoomRoutingModule
  ]
})
export class ChatRoomModule { }
