import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as steem from 'steem';
/*
  Generated class for the SteemProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SteemProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SteemProvider Provider');
    steem.api.setOptions({ url: 'https://api.steemit.com' });
  }


  getDiscussionsByCreated(limit: number): Promise<any> {
    const query = {
      "tag": "bloque64",
      "limit": limit
    }
    return new Promise(function (resolve, reject) {
      steem.api.getDiscussionsByCreated(query, res => {
        console.log("provider dice", res);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }


  GetContent(author, permlink) {
    steem.api.getContent(author, permlink, function (err, result) {
      console.log(err, result);
    });

  }

  GetContentReplies(author, permlink) {
    steem.api.getContentReplies(author, permlink, function (err, result) {
      console.log(err, result);
    });
  }



}
