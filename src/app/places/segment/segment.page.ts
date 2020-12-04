import { Component, OnInit } from '@angular/core';

import { HttpRequestServiceService } from './../../services/http-request-service.service';
import { PlacesService } from './../places.service';

import { Place } from './../place.model';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  loadedPlaces: Place[] = [{
    id : '',
    title: '',
    description: '',
    imageUrl: '',
    latitude: 0,
    logitude: 0,
    category: '',
  }];
  selectedPlaceId: string;
  selectedPlace: Place = {
    id : '',
    title: '',
    description: '',
    imageUrl: '',
    latitude: 0,
    logitude: 0,
    category: '',
  };

  constructor(
    private placesService: PlacesService,
    private httpRequest: HttpRequestServiceService
  ) { }

  ngOnInit() {
    this.displayPlaces();
    this.segmentChanged(1);
  }

  segmentChanged(event){
    this.selectedPlaceId = event.detail.value;
    this.httpRequest.getPlace(this.selectedPlaceId).subscribe(
      place => {
        this.selectedPlace = place;
      },
      error => {
        console.log(error);
      }
    );
  }

  async displayPlaces() {
    this.httpRequest.getPlaces().subscribe(
      places => {
        this.loadedPlaces = places;
        this.selectedPlaceId = this.loadedPlaces[0].id;
        this.selectedPlace = this.placesService.getPlace(this.selectedPlaceId);
      },
      error => {
        console.log(error);
      }
    );
  }

}
