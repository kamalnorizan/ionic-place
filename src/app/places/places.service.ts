import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[];

  get places() {
    return [...this._places];
  }

  getPlace(id: string) {
    return { ...this._places.find(p => p.id === id) };
  }

  constructor() { }

}
