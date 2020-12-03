import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { HttpClientModule } from '@angular/common/http'
import { RestModuleLinkObject } from './global-models';

@Injectable({
  providedIn: 'root'
})
export class RestModuleService {
  RestApiBaseLink: string = "http://92.241.66.195:40003/api/";
  constructor() { }

  channel(IsAuthrized: boolean, link_object: RestModuleLinkObject, parameters: any, files: any): any {
    let _this = this;
    console.log("channel Stated");


    let PromiseObject = new Promise(function (resolve, reject) {
      let url = _this.RestApiBaseLink + link_object.link;
      

      let formData = new FormData();
      for (let key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          formData.append(key, parameters[key]);
        }
      }
      if (files) {
        for (let index = 0; index < files.length; ++index) {
          formData.append("File", files[index]);
        }
      }

      let HC = new HttpClientModule();
      



      var xhr = new XMLHttpRequest();
      xhr.open(link_object.method, url);
      if (IsAuthrized) {
        let token = _this.GetToken();
        if (token)
          xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }


      xhr.onload = function () {

        let JsonObj = JSON.parse(xhr.response)
        resolve(JsonObj);
      };
      xhr.onerror = function () {
        console.log("Error");
        console.log(xhr);
      };
      xhr.send(formData);
    });


    return PromiseObject;

  }

  GetToken(): string {
    let cname = "CRMtoken";

    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  SetToken(Token: string): void {
    let ExpireDate = new Date();
    let d = new Date();
    let CookieName = "CRMtoken";
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = CookieName + "=" + Token + ";" + expires + ";path=/";
  }
}
