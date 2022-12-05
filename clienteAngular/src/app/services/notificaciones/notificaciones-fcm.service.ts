import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { auth, firestore } from 'firebase';

// Device detector
import { DeviceDetectorService } from 'ngx-device-detector';

import { BehaviorSubject } from 'rxjs';

@Injectable()
@Injectable({
  providedIn: 'root'
})
export class NotificacionesFCMService {

  private _user: any = new BehaviorSubject(null);
  constructor(
    private afAuth: AngularFireAuth,
    private _afs: AngularFirestore,
    private deviceService: DeviceDetectorService
  ) {

    this.afAuth.user.subscribe(async user => {
      try {
        this.setUser(user);
        const token = return
this.messaging.requestPermission().then(() => {
      return this.messaging.getToken();
    });
        this.alert. this.messaging.onMessage((payload: any) => {
      this.showSuccess(
        `${payload.notification.title} : ${payload.notification.body}`
      );
    });
        this.updatePushToken(token);
      } catch (error) {
console.log("Error Message ", error);
      }

    });
  }
  private setUser(user: any) {
    this._user.next(user);
  }

  public get user(): BehaviorSubject<any> {
    return this._user;
  }


  /**
 * Update the User's push token
 * @param token string
 */
  public async updatePushToken(token: string) {
    try {
      const devices = await this._afs.firestore.collection('Devices').where('token', '==', token).get();

      if (devices.empty) {
        const deviceInfo = this.deviceService.getDeviceInfo();
        const data = {
          token: token,
          userId: this._user._value.uid,
          deviceType: 'web',
          deviceInfo: {
            browser: deviceInfo.browser,
            userAgent: deviceInfo.userAgent
          },
          createdAt: firestore.FieldValue.serverTimestamp()
        };

        await this._afs.firestore.collection('Devices').add(data);
        console.log('New Device Added');
      } else {
        console.log('Already existing Device');
      }
    } catch (error) {
      console.log("Error Message", error);
    }
  }
   
}
