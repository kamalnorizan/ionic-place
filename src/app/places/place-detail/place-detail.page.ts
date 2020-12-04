import { LoadingController } from '@ionic/angular';
import { HttpRequestServiceService } from './../../services/http-request-service.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Place } from './../place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpRequest: HttpRequestServiceService,
    private loadingController: LoadingController
  ) { }

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

  ngOnInit() {
    this.presentLoading();
    this.loadDetailPlace(this.route.snapshot.paramMap.get('placeId'));
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      duration: 500
    });
    await loading.present();
  }

  ionViewWillEnter() {
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



  // async loadPlace(placeId) {
  //   this.httpRequest.getPlace(placeId).subscribe(
  //     place => {
  //       this.place = place;
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

}
