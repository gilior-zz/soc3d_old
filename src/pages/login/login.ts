import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = {
    email: '',
    pwd: ''
  }
  regPage: string = 'RegisterPage'

  constructor(public navCtrl: NavController,
              public navParams: NavParams, public  userServiceProvider: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    if (!this.login.pwd || !this.login.email)
      return this.userServiceProvider.displayAlerts('try again', 'smartass')
    this.userServiceProvider.logon(this.login.email, this.login.pwd)
      .then(res => {
        if (this.userServiceProvider.success) return this.navCtrl.push(HomePage)
        this.login.pwd = '';
        this.login.email = '';
      })

  }

}
