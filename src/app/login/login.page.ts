import { RegisterPage } from './../register/register.page';
import { HttpRequestServiceService } from './../services/http-request-service.service';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email;
  password;

  constructor(
    private modalController: ModalController,
    private httpRequest: HttpRequestServiceService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }


  dismissLogin() {
    this.modalController.dismiss();
  }

  login() {
    this.httpRequest.login(this.email, this.password).subscribe(
      data => {
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.navCtrl.navigateRoot('/places');
      }
    );
  }

  async registerModal() {
    this.dismissLogin();
    const registerModal = await this.modalController.create({
      component: RegisterPage
    });
    return await registerModal.present();
  }

}
