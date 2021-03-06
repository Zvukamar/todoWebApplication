import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LogRegService } from './log-reg.service';
@Injectable()
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private logreg: LogRegService) { }

  updateToken(token) {
    this.logreg.isSignInStream.subscribe(signin => {
      if (!signin) {
        return;
      }
      this.db.object(`fcmTokens/${this.logreg.userUID}`).update({'myToken': token});
    });
  }

  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }

    receiveMessage() {
      console.log('msg');
       this.messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        this.currentMessage.next(payload);
      });
    }
}
