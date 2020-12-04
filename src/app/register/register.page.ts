import { LoginPage } from './../login/login.page';
import { HttpRequestServiceService } from './../services/http-request-service.service';
import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name;
  email;
  password;
  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private httpRequest: HttpRequestServiceService
  ) { }

  ngOnInit() {
  }

  dismissRegister() {
    this.modalController.dismiss();
  }

  register() {
    this.httpRequest.register(this.name, this.email, this.password).subscribe(
      data => {
        this.httpRequest.login(this.email, this.password).subscribe(
          thedata => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.navCtrl.navigateRoot('/places');
          }
        );
      },
      error => {
        console.log(error);
      },
      () => {
      }
    );
  }

  async loginModal() {
    this.dismissRegister();
    const loginModal = await this.modalController.create({
      component: LoginPage
    });
    return await loginModal.present();
  }

}
