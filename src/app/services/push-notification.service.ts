import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import 'firebase/messaging';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  pushNotificationToken: string = null;
  constructor(private messaging: AngularFireMessaging) {}

  requestPermission() {
    this.messaging.requestToken.subscribe(
      (token) => {
        this.pushNotificationToken = token;
      },
      (error) => {
        console.error('Something bad happened');
      }
    );
  }

  receiveMessage() {
    this.messaging.messages.subscribe((payload: any) => {
      console.log(payload);
    });
  }
}
