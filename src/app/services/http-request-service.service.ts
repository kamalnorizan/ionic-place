import { AlertController } from '@ionic/angular';
import { Place } from './../places/place.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestServiceService {

  API_URL = 'http://ionicapiplaces.test/api/';
  places: Place[];
  place: Place;
  isLoggedIn = false;
  token: any;
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private alertController: AlertController
  ) { }

  getPlaces() {
    return this.http.get<Place[]>(this.API_URL + 'places')
    .pipe(
      tap(places => {
        this.places = places;
        return places;
      })
    );
  }

  getPlace(placeId) {
    return this.http.get<Place>(this.API_URL + 'places/' + placeId)
    .pipe(
      tap(place => {
        this.place = place;
        return place;
      })
    );
  }

  updatePlace( id: string, title: string, description: string, category: string, latitude: Number, longitude: Number) {
    return this.http.post(this.API_URL + 'places/update/' + id ,
      { id, title, description, category, latitude, longitude }
    );
  }

  deletePlace(id: string) {
    const headers = new HttpHeaders({
      'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
    });

    // return this.http.post(this.API_URL)

    return this.http.post(this.API_URL + 'places/delete', { id }, {headers} );
  }

  login(email: string, password: string) {
    return this.http.post(this.API_URL + 'auth/login',
      { email, password }
    ).pipe(
      tap(
        token => {
          this.storage.setItem('token', token)
            .then(
              () => {
                console.log('BERJAYA!!');
              },
              error => console.error('Error login', error)
            );
          this.token = token;
          this.isLoggedIn = true;
          return token;
        },
        error => {
          this.presentAlert();
        }
      ),
    );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Wrong Email/Password',
      message: 'Fail to login. Please check your credential',
      buttons: ['OK']
    });

    await alert.present();
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token['token_type'] + ' ' + this.token['access_token']
    });

    return this.http.get(this.API_URL + 'auth/logout', { headers })
    .pipe(
      tap(data => {
        this.storage.remove('token');
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(this.API_URL + 'auth/register',
      { name, email, password }
    );
  }

}
