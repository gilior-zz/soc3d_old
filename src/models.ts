export interface UserData {
  username: string,
  creation: Date,
  logins: number,
  rewardsCount: number,
  lastLogin: Date,
  id: string
}

export interface Rewarded {
  rewardedId: string;
  amount: number
}
