import { HttpRequestServiceService } from './../services/http-request-service.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, MenuController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private httpRequest: HttpRequestServiceService,
    private navCtrl: NavController
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.httpRequest.getToken().then(
      () => {
        if (this.httpRequest.isLoggedIn) {
          this.navCtrl.navigateRoot('/places');
        }
    });
  }

  async login() {
    const loginModal = await this.modalController.create({
      component: LoginPage
    });
    return await loginModal.present();
  }

  async register() {
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

}
