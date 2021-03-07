import {Injectable} from '@angular/core';
import {Client, over} from "stompjs";
import {BehaviorSubject, Observable} from "rxjs";
import {SocketState} from "../model/SocketState";
import {environment} from "../../environments/environment";
import * as SockJS from "sockjs-client";
import {filter} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private client:Client;
  private state:BehaviorSubject<SocketState>;

  constructor() {
    this.client = over(<WebSocket>new SockJS(environment.socketURL));
    this.state = new BehaviorSubject<SocketState>(SocketState.ATTEMPTING);
    this.client.connect({},()=>{
      this.state.next(SocketState.CONNECTED);
    });
  }

  private connect():Observable<Client>{
    return new Observable<Client>( observer => {
      this.state.pipe(filter(state => state === SocketState.CONNECTED)).subscribe(()=>{
        observer.next(this.client);
      })
    });
  }




}
