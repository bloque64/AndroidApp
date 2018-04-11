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
    this.api = sc2.Initialize({
      app: 'bloquetest',
      callbackURL: 'http://localhost:8100',
      scope: ['vote', 'comment']
    });
    
  }

  Getuserprofile() {
    return this.api.me(function (err, res) {
      console.log(err, res)
    });
  }

  Vote(voter, author, permlink, weight) {
    return this.api.vote(voter, author, permlink, weight, function (err, res) {
      console.log(err, res)
    });
  }

  Comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata) {
    return this.api.comment(parentAuthor, parentPermlink, author, permlink, title, body, jsonMetadata, function (err, res) {
      console.log(err, res)
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

}
