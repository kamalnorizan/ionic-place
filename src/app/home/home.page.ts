import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public alertController: AlertController,
    private router: Router
  ) { }

  gotoPlaces() {
    this.router.navigate(['/places']);
  }

  async callAlertPopup() {
    const alert = await this.alertController.create({
      header: 'Your first alert',
      message: 'Congratulation on your alert controller',
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log('OK Button clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel Button clicked');
        }
      }]
    });

    await alert.present();
  }

}
