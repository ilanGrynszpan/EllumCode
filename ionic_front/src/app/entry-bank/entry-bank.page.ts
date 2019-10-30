import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-bank',
  templateUrl: './entry-bank.page.html',
  styleUrls: ['./entry-bank.page.scss'],
})
export class EntryBankPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(['/tabs/tab1']);
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }

}
