import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.page.html',
  styleUrls: ['./fatura.page.scss'],
})
export class FaturaPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/tabs/tab1'])
  }

}
