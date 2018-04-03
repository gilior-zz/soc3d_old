import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AlertController} from "ionic-angular";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Storage} from "@ionic/storage";

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
  items: FirebaseListObservable<any>

  constructor(private angularFireAuth: AngularFireAuth,
              public alertController: AlertController,
              private storage: Storage,
              private angularFireDatabase: AngularFireDatabase) {
    this.items = this.angularFireDatabase.list('/users');
  }

  displayAlerts(alertTitle, alertSub) {
    let l = this.alertController.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ['OK']
    });
    l.present();
  }

  logOut() {
    this.angularFireAuth.auth.signOut()
      .then(res => this.displayAlerts('logged out', 'ba by'))
      .catch(err => this.displayAlerts('err!', err))
  }

  storageControl(action, key?, value?) {
    if (action === 'set') return this.storage.set(key, value);
    if (action === 'get') return this.storage.get(key);
  }

}
