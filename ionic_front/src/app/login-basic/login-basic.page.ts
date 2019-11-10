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
    private rest_urls: RestUrlsService,
    private storage: Storage) { }

  ngOnInit() {
  }

  goHome(){

    if(this.data_pckg.cpf == '') {

      console.log("no entry");
      return;
    }

    this.http.post(this.rest_urls.rest_urls['usuario'] + '123/auth_user/', this.data_pckg).subscribe(

      (data) => {

        if(data == "not_auth_wrong_passcode") {

          console.log("passcode wrong");
          return;
        }

        else if(data == "no_passcode_input") {

          console.log("no passcode input");
          return;
        }

        console.log(data);
        this.storage.set('nome', data['usuario']['nome']);
        this.storage.set('cpf', data['usuario']['cpf']);
        this.storage.set('celular', data['usuario']['celular']);
        this.storage.set('id_usuario', data['usuario']['id_usuario']).then((val) => {

          this.storage.get('id_usuario').then((val) => {

            console.log(val);

            if(val == data['usuario']['id_usuario']) {

              console.log("right");
              this.router.navigate(['/tabs/tab1']);
            }

            else {

              console.log("wrong");
            }
          });

        },

        (error) => {

          console.log(error);
        }
      );
      });
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }

}
