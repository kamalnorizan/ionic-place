import { HttpRequestServiceService } from './../../services/http-request-service.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Place } from './../place.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.page.html',
  styleUrls: ['./place-edit.page.scss'],
})
export class PlaceEditPage implements OnInit {

  placeId = null;
  place: Place = {
    id : '',
    title: '',
    description: '',
    imageUrl: '',
    latitude: 0,
    logitude: 0,
    category: '',
  };

  constructor(
    private route: ActivatedRoute,
    private httpRequest: HttpRequestServiceService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      duration: 500
    });
    await loading.present();
  }

  ionViewWillEnter() {
    this.presentLoading();
    this.loadDetailPlace(this.route.snapshot.paramMap.get('placeId'));
  }

  loadDetailPlace(placeId) {
    this.httpRequest.getPlace(placeId).subscribe(
      place => {
        this.place = place;
      }, error => {
        console.log(error);
      }
    );
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'All field is required.',
      duration: 2000
    });
    toast.present();
  }

  update() {
    if (this.place.title === '' || this.place.description === '' || this.place.category === '') {
      this.presentToast();
    } else {
      this.httpRequest.updatePlace(this.place.id, this.place.title, this.place.description, this.place.category)
      .subscribe(
        data => {
          this.navCtrl.navigateRoot('/places');
        }
      );
    }
  }

}
