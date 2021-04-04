import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationRequest} from "../../model/chatal.model";
import {AuthService} from "../../services/auth.service";
import {AppSettings} from "../../app.settings";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  request: AuthenticationRequest = {};

  constructor(private _authService: AuthService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  signIn() {
    console.log(this.request);
    this._authService.authenticate(this.request).subscribe(response => {
        if (response) {
          this._router.navigate(["/chat-room"])
        }
      },
      error => {
        this._router.navigate(["notification", "error"], {state: {errCode: error.status}})
      });
  }


}
