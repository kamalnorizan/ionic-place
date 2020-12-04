import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpRequestServiceService } from './../services/http-request-service.service';
import { LoadingServiceService } from './../services/loading-service.service';

import { Place } from './place.model';

@Component({
  selector: 'app-places',
  templateUrl: './places.page.html',
  styleUrls: ['./places.page.scss'],
})
export class PlacesPage implements OnInit {

  loadedPlaces: Place[];
  featuredPlace: Place = {
    id : '',
    title: '',
    description: '',
    imageUrl: '',
    latitude: 0,
    logitude: 0,
    category: '',
  };

  constructor(
    private router: Router,
    private httpRequest: HttpRequestServiceService,
    private alertController: AlertController,
    public loading: LoadingServiceService,
    public toastController: ToastController,
    private menu: MenuController
  ) {
    this.menu.enable(true);
   }

  ngOnInit() {
    // this.loading.present();
  }

  ionViewWillEnter() {
    this.displayPlaces();
  }

  async displayPlaces() {
    this.httpRequest.getPlaces().subscribe(
      places => {
        this.loadedPlaces = places;
        this.featuredPlace = places[0];
        if (this.loading.isLoading === true) {
          // this.loading.dismiss();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  gotoDetail(placeId, placeName) {
    this.router.navigate(['places', 'placedetail', placeId, placeName]);
  }

  async onDelete(id) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to remove this item?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.httpRequest.deletePlace(id).subscribe(
              status => {
                this.displayPlaces();
                this.presentToast();
              }
            );
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Place removed successfully',
      duration: 2000
    });
    toast.present();
  }

}
