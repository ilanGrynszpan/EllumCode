import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-profile',
  templateUrl: './entry-profile.page.html',
  styleUrls: ['./entry-profile.page.scss'],
})
export class EntryProfilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBank(){
    this.router.navigate(['/entry-bank']);
  }

  goBack(){
    this.router.navigate(['/nolog-entry']);
  }
}
