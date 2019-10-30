import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-basic',
  templateUrl: './login-basic.page.html',
  styleUrls: ['./login-basic.page.scss'],
})
export class LoginBasicPage implements OnInit {

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
