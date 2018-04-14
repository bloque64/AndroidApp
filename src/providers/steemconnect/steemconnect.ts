import { Injectable } from '@angular/core';
import * as sc2 from 'sc2-sdk'
/*
  Generated class for the SteemconnectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SteemconnectProvider {


  api: any;
  constructor() {
    this.verifiLogin();
  }

  Getuserprofile(): Promise<any> {

    const api = this.api;
    return new Promise(function (resolve, reject) {

      api.me(function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }

  Vote(voter, author, permlink, weight) {

    return this.api.vote(voter, author, permlink, weight, function (err, res) {
      console.log(err, res)
    });
  }

  Comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata) {
    const api = this.api;
    return new Promise(function (resolve, reject) {
      api.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });

    });
  }


  Logout() {
    return this.api.revokeToken(function (err, res) {
      console.log(err, res)
    });
  }
  Reblog(account, author, permlink) {
    return this.api.reblog(account, author, permlink, function (err, res) {
      console.log(err, res)
    });
  }
  Follow(follower, following) {
    return this.api.follow(follower, following, function (err, res) {
      console.log(err, res)
    });
  }
  Unfollow(unfollower, unfollowing) {
    return this.api.unfollow(unfollower, unfollowing, function (err, res) {
      console.log(err, res)
    });
  }
  Ignore(follower, following) {
    return this.api.ignore(follower, following, function (err, res) {
      console.log(err, res)
    });
  }

  getLoginURL() {
    return this.api.getLoginURL();
  }

  verifiLogin() {
    if (localStorage.getItem("dataccess")) {
      this.setAccessToken(JSON.parse(localStorage.getItem("dataccess")).access_token);
    } else {
      this.api = sc2.Initialize({
        app: 'bloquetest',
        callbackURL: 'http://localhost:8100',
        scope: ['vote', 'comment']
      });
    }
  }

  setAccessToken(token) {
    this.api = sc2.Initialize({
      app: 'bloquetest',
      callbackURL: 'http://localhost:8100',
      scope: ['vote', 'comment'],
      accessToken: token
    });

  }

}
