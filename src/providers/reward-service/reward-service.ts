import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Rewarded, UserData} from "../../models";
import {Storage} from "@ionic/storage";
import {RewardModalPage} from "../../pages/reward-modal/reward-modal";
import {ModalController} from "ionic-angular";

/*
  Generated class for the RewardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RewardServiceProvider {
  rewards: Rewarded[] = [];
  list: number[] = [.50, .75, 1.00, 1.25, 1.50, 1.75, 2.00, .25, .50, .75];

  constructor(public storage: Storage,
              public  modalController: ModalController) {
    console.log('Hello RewardServiceProvider Provider');
  }

  rewardsCheck(user: string, userData: UserData) {
    return new Promise((resolve, reject) => {
      userData.logins += 1;
      if (userData.logins % 3 === 0) {
        let firstReward = this.rewardChance(user, userData.rewardsCount);
        userData.rewardsCount = firstReward;
        resolve(userData);
      }
      else if (userData.rewardsCount % 10 == 0) {
        let newCount = this.rewardChance(user, userData.rewardsCount);
        userData.rewardsCount = newCount;
        resolve(userData);
      }
      else {
        resolve(userData);
      }
    })
  }

  displayReward(amount: number) {
    let l = this.modalController.create(RewardModalPage, {'rewardParam': amount})
    l.present();
  }

  private rewardChance(user: string, rewardsCount: number): number {
    if (rewardsCount === 0) {
      rewardsCount++;
      this.generateReward(user, rewardsCount);
      return rewardsCount;
    }
    else {
      let chance = Math.floor(Math.random() * 100 + 1);
      if (chance > 50) {
        rewardsCount++;
        this.generateReward(user, rewardsCount);
        return rewardsCount;
      }
      else return rewardsCount;
    }
  }

  private generateReward(user: string, rewardsCount: number) {
    let dex = Math.floor(Math.random() * 10);
    let rewarded = this.list[dex];
    let rewardedObj: Rewarded = {
      rewardedId: 'REW-' + rewardsCount,
      amount: rewarded
    }
    this.storage.get(user + '-rewards')
      .then(returned => {
        if (!returned) {
          this.rewards.push(rewardedObj);
          this.storage.set(user + '-rewards', this.rewards)
            .then(res => this.displayReward(rewarded))
        }
        this.rewards = returned;
        this.rewards.push(rewardedObj);
        this.storage.set(user + '-rewards', this.rewards)
          .then(res => res => this.displayReward(rewarded))
      })
  }
}
