import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-cloud-solution';

  menu :boolean = true
  constructor(private route: Router) {
  }
  ngDoCheck(){
    console.log("this.route.url===",this.route.url)
    if(this.route.url === '/signin' || this.route.url==='/signip') this.menu = false
    else this.menu = true
  }

}
