import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  username:string="";

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  submit(){
    console.log(this.username);
  }

}
