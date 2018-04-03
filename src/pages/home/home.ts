import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {UserServiceProvider} from "../../providers/user-service/user-service";

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
  loggedIn: any;

  constructor(public navCtrl: NavController,
              private angularFireAuth: AngularFireAuth,
              public userServiceProvider: UserServiceProvider) {
    this.logPage = "LoginPage";
    this.angularFireAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = user.email;
      }
    })
  }

  signOff() {
    this.userServiceProvider.logOut();
    this.loggedIn = '';
  }
}
