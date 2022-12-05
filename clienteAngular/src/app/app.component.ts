import { Component } from '@angular/core';
//import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { catchError, observable, Observable, of } from 'rxjs';

import { environment } from "../environments/environment";

//import { initializeApp } from "firebase/app";
//import { getMessaging } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clienteAngular';
  constructor() {

    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    /*const firebaseConfig = {
      apiKey: "AIzaSyAgxBo5asf0B7RPrMW8o1t7qF-lAwPxt1M",
      authDomain: "seproamerica-81c1f.firebaseapp.com",
      projectId: "seproamerica-81c1f",
      storageBucket: "seproamerica-81c1f.appspot.com",
      messagingSenderId: "1052573241503",
      appId: "1:1052573241503:web:2c662c0ee8b2eb407bd2aa",
      measurementId: "G-R8PVY8CQHR",
      vapidKey: "AAAA9RJBEJ8:APA91bHxk4T1d6Hq1okAMy85A25z-1kyv_Rl9jFoTEU7PjRsYM2w7WOqqCcSktbhp8uLk-ABXY7wccgoDDziSJS8_15fv0E6k5SjB3abPo3ITBFhgEkQIMwW_g8AXGyXMCOkY4L1SNDM"
  
  
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);


    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app);
  
    this.requestPermission()*/
  }

/* requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }})
    }*/
}


