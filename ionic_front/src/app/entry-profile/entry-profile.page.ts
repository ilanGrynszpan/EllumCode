import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

import { RestUrlsService } from '../rest-urls.service';

@Component({
  selector: 'app-entry-profile',
  templateUrl: './entry-profile.page.html',
  styleUrls: ['./entry-profile.page.scss'],
})
export class EntryProfilePage implements OnInit {

  constructor(private router: Router, 
    private http: HttpClient, 
    private rest_urls: RestUrlsService) { }

  ngOnInit() {
  }

  goBank(){

    this.http.get(this.rest_urls.rest_urls['usuario']).subscribe(

      (data) => {

        console.log(data);
      },

      (error) => {

        console.log(error);
      }
    );

    //this.router.navigate(['/entry-bank']);
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }
}
