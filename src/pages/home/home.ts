import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    {title: 'Our menu', pic: 'assets/imgs/a.jpg', pushPage: 'MenuPage'},
    {title: 'Account', pic: 'assets/imgs/b.jpg', pushPage: 'AccountPage'},
    {title: 'About Us', pic: 'assets/imgs/c.jpg', pushPage: 'AboutPage'},
    {title: 'Locations', pic: 'assets/imgs/d.jpg', pushPage: 'LocationsPage'},
  ]

  logPage: string;

  constructor(public navCtrl: NavController) {
    this.logPage = "LoginPage"
  }

}
