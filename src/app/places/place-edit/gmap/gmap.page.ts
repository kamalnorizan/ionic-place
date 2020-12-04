import { HttpRequestServiceService } from './../../../services/http-request-service.service';
import { ActivatedRoute } from '@angular/router';
import { Place } from './../../place.model';
import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.page.html',
  styleUrls: ['./gmap.page.scss'],
})
export class GmapPage implements OnInit {

  placeId = null;
  place: Place = {
    id: '',
    title: '',
    description: '',
    imageUrl: '',
    latitude: 3.119291,
    logitude: 101.689018,
    category: '',
  };

  title = 'My first AGM project';
  lat = 3.119291;
  lng = 101.689018;
  height = 10;

  constructor(
    public platform: Platform,
    private route: ActivatedRoute,
    private httpRequest: HttpRequestServiceService,
    private loadingController: LoadingController
  ) {

    console.log(platform.height());
    this.height = platform.height() - 56;
  }

  ngOnInit() {
    this.loadDetailPlace(this.route.snapshot.paramMap.get('placeId'));
  }

  loadDetailPlace(placeId) {
    this.httpRequest.getPlace(placeId).subscribe(
      place => {
        this.place = place;
        this.lat = Number(place.latitude);
        this.lng = Number(place.logitude);
      }, error => {
        console.log(error);
      }
    );
  }

}
