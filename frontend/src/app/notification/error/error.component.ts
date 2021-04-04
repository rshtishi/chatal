import {Component, OnInit} from '@angular/core';
import {Error} from '../../model/error.model'
import {Location} from "@angular/common";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error: Error = {code: -1, message: 'undefined', details: 'undefined'};
  errorMapping = new Map();

  constructor(private location: Location) {
  }

  ngOnInit(): void {
    this.errorMapping.set(400, {
      code: 400,
      message: "Bad Request",
      details: "The server could not understand the request due to invalid syntax."
    });
    this.errorMapping.set(401, {
      code: 401,
      message: "Unauthorized",
      details: "The client must authenticate itself to get the requested response."
    });
    this.errorMapping.set(403, {
      code: 403,
      message: "Forbidden",
      details: "Te client does not have access rights to the content."
    });
    this.errorMapping.set(404, {
      code: 404,
      message: "Not Found",
      details: "The server can not find the requested resource."
    });
    this.errorMapping.set(405, {
      code: 405,
      message: "Method Not Allowed",
      details: "The request method is known by the server but has been disabled and cannot be used."
    });
    this.errorMapping.set(406, {
      code: 406,
      message: "Not Acceptable",
      details: "This response is sent when the web server, after performing server-driven content negotiation, doesn't find any content that conforms to the criteria given by the user agent."
    });
    this.errorMapping.set(500, {
      code: 500,
      message: "500 Internal Server Error",
      details: "The server has encountered a situation it doesn't know how to handle."
    });
    this.errorMapping.set(503, {
      code: 503,
      message: "Service Unavailable",
      details: "The server is not ready to handle the request."
    });
    if(this.errorMapping.get(history.state.errCode)){
      this.error = this.errorMapping.get(history.state.errCode);
    }
  }

  public back() {
    this.location.back();
  }

}
