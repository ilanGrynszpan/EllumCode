import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { RestUrlsService } from '../rest-urls.service';

@Component({
  selector: 'app-entry-bank',
  templateUrl: './entry-bank.page.html',
  styleUrls: ['./entry-bank.page.scss'],
})
export class EntryBankPage implements OnInit {

  private user_id:any = "";
  
  private bank_info:any = {

    banco:"",
    agencia:"",
    conta:""
  }

  constructor(private router: Router,
    private storage: Storage,
    private http: HttpClient, 
    private rest_urls: RestUrlsService) { }

  ngOnInit() {

    this.storage.get('user_id').then(

      (val) => {

        console.log(val);
        this.user_id = val;
        return;
      },
      (error) => {

        console.log(error);
        return;
      }
    );
  }

  setBankingData() {

    if(this.bank_info['banco'].length < 1) {

      console.log("no_bank_input");
      return;
    }

    else if(this.bank_info['agencia'].length < 1) {

      console.log("no_agency_input");
      return;
    }

    else if(this.bank_info['conta'].length < 1) {

      console.log("no_acc_input");
      return;
    }

    console.log(this.bank_info);

    this.http.post(this.rest_urls.rest_urls['usuario'] + this.user_id + "/set_banking_information/", this.bank_info).subscribe(

      (data) => {

        console.log("saved");

        this.storage.set('user_banking_info', this.bank_info).then(

          (val) => {

            console.log(data);
            this.goSubmit();
          }
        )
      },

      (error) => {

        console.log(error);
      }
    );
    return;
  }

  goSubmit(){
    this.router.navigate(['/first-service']);
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }

}
