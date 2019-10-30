import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nolog-entry',
  templateUrl: './nolog-entry.page.html',
  styleUrls: ['./nolog-entry.page.scss'],
})
export class NologEntryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  
  goCadastro(){
    this.router.navigate(['/entry-profile']);
  }

  goEntry(){
    this.router.navigate(['/login-basic']);
  }

}
