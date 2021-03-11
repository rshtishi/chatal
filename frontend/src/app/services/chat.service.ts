import {Injectable, OnDestroy} from '@angular/core';
import {Client, Message, over} from "stompjs";
import {BehaviorSubject, Observable} from "rxjs";
import {SocketState} from "../model/SocketState";
import {environment} from "../../environments/environment";
import * as SockJS from "sockjs-client";
import {filter, first, switchMap} from "rxjs/operators";
import {StompSubscription} from "@stomp/stompjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  private client: Client;
  private state: BehaviorSubject<SocketState>;

  constructor() {
    this.client = over(<WebSocket>new SockJS(environment.socketURL));
    this.state = new BehaviorSubject<SocketState>(SocketState.ATTEMPTING);
    this.client.connect({}, () => {
      this.state.next(SocketState.CONNECTED);
    });
  }

  private connect(): Observable<Client> {
    return new Observable<Client>(observer => {
      this.state.pipe(filter(state => state === SocketState.CONNECTED)).subscribe(() => {
        observer.next(this.client);
      })
    });
  }

  onMessage(topic: string, handler = ChatService.jsonHandler): Observable<any> {
    return this.connect().pipe(first(), switchMap(client => {
      return new Observable<any>(observer => {
        const subscription: StompSubscription = client.subscribe(topic, message => {
          observer.next(handler(message.body));
        });
        return () => client.unsubscribe(subscription.id);
      });
    }));
  }

  onPlainMessage(topic: string): Observable<string> {
    return this.onMessage(topic, ChatService.textHandler);
  }

  send(topic: string, payload: any): void {
    this.connect()
      .pipe<Client>(first())
      .subscribe(client => client.send(topic, {}, JSON.stringify(payload)));
  }

  static jsonHandler(message: Message): any {
    return JSON.parse(message.body);
  }

  static textHandler(message: Message): string {
    return message.body;
  }

  ngOnDestroy() {
    this.connect().pipe<Client>(first()).subscribe(client => client.disconnect(null));
  }

}
