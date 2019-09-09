import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-credito',
  templateUrl: './novo-credito.page.html',
  styleUrls: ['./novo-credito.page.scss'],
})
export class NovoCreditoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/tabs/tab1'])
  }
}
