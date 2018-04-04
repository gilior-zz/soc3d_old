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
  success: boolean;

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
    if (!key) {
      this.displayAlerts('acthung', 'delete a-l-l data');
      return this.storage.clear();
    }
    this.displayAlerts('key', 'delete this users data');
    return this.storage.remove(key);
  }

  saveNewUserToStorage(user) {
    let userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardsCount: 0,
      lastLogin: new Date().toLocaleString(),
      id: ''
    }
    this.items.push({
      username: user,
      creation: userObj.creation,
      logins: userObj.logins,
      rewardsCount: userObj.rewardsCount,
      lastLogin: userObj.lastLogin
    })
      .then(res => {
        userObj.id = res.key;
        return this.storageControl('set', user, userObj)
      });

    return this.storageControl('get', user);
  }

  updateUser(user, userData) {
    let newData = {
      creation: userData.creation,
      logins: userData.logins + 1,
      rewardsCount: userData.rewardsCount,
      lastLogin: new Date().toLocaleString(),
      id: userData.id
    };
    this.items.update(newData.id, {
      logins: newData.logins,
      rewardsCount: newData.rewardsCount,
      lastLogin: newData.lastLogin
    });
    return this.storageControl('set', user, newData)
  }

  logon(user, pwd) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(user, pwd)
      .then(res => {
        this.storageControl('get', user)
          .then(userFromStorage => {
            if (!userFromStorage) {
              this.saveNewUserToStorage(user)
                .then(res => this.displayAlerts(user, 'user saved'))
            }
            else {
              this.updateUser(user, userFromStorage)
                .then(updatedUser => this.displayAlerts(user, 'updated some data'))
            }
            this.success = true;
          })
          .catch(err => {
            this.success = false;
            this.displayAlerts('err login', err);
            return err;
          })
      })
  }

}
