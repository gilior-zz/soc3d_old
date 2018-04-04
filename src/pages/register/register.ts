import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {HomePage} from "../home/home";
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  req = {
    email: '',
    pwd1: '',
    pwd2: '',
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public  alertController: AlertController,
              public angularFireAuth: AngularFireAuth,
              public  userServiceProvider: UserServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  displayAlerts(alertTitle, alertSub) {
    let l = this.alertController.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    l.present();
  }

  registerAccount() {
    if (this.req.pwd1 != this.req.pwd2) {
      this.displayAlerts('pwd problem', 'pwds not match');
      this.req.pwd1 = this.req.pwd2 = '';
      return;
    }
    this.angularFireAuth.auth.createUserWithEmailAndPassword(this.req.email, this.req.pwd1)
      .then(res => this.regSuccess(res))
      .catch(err => this.displayAlerts('error!', err))
  }

  private regSuccess(res: any) {

    this.userServiceProvider.logon(this.req.email, this.req.pwd1)
      .then(res => this.navCtrl.push(HomePage))
  }
}
