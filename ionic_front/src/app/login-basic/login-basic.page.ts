import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { RestUrlsService } from '../rest-urls.service';

@Component({
  selector: 'app-login-basic',
  templateUrl: './login-basic.page.html',
  styleUrls: ['./login-basic.page.scss'],
})
export class LoginBasicPage implements OnInit {

  private data_pckg = {

    cpf: ""
  };

  constructor(private router: Router, 
    private http: HttpClient, 
    private rest_urls: RestUrlsService) { }

  ngOnInit() {
  }

  goHome(){

    this.http.post(this.rest_urls.rest_urls['usuario'] + '123/auth_user/', this.data_pckg).subscribe(

      (data) => {

        console.log(data);
      },

      (error) => {

        console.log(error);
      }
    );

    //this.router.navigate(['/tabs/tab1']);
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }

}
