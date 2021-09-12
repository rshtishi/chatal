import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  username:string="";

  constructor(private elementRef: ElementRef,
              private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.onMessage("/topic").subscribe(data => console.log(data));
  }

  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
  }

  submit(){
    this.chatService.send("/topic",this.username);
  }

}
