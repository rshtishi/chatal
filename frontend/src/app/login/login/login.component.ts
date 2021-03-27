import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../model/chatal.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  request:AuthenticationRequest={};

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  }

  signIn(){
    console.log(this.request);
  }

}
