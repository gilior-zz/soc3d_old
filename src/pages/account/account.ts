import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";
import {UserData} from "../../models";

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {

  accountUser: string;
  userInfo: UserData;
  rewardInfo: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public userServiceProvider: UserServiceProvider) {
  }


  ngOnInit(): void {
    this.accountUser = this.userServiceProvider.user;
    this.userServiceProvider.storageControl("get", this.accountUser)
      .then(userData => this.userInfo = userData)
    this.userServiceProvider.storageControl("get", this.accountUser + '-rewards')
      .then(rewardData=>this.rewardInfo=rewardData)
  }

  ionViewCanEnter(): boolean {
    return this.userServiceProvider.success;
  }

}
