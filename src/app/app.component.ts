import { Component } from '@angular/core';

import { HttpRequestServiceService } from './services/http-request-service.service';
import { Platform, NavController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Places',
      url: '/places',
      icon: 'list'
    },
    {
      title: 'Segmented Place',
      url: '/places/segment',
      icon: 'barcode'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpRequest: HttpRequestServiceService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have been logged out successfully',
      duration: 2000
    });
    toast.present();
  }

  logout() {
    this.httpRequest.logout().subscribe(
      data => {
        this.presentToast();
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/landing');
      }
    );
  }
}
