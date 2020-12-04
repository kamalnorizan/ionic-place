import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceEditPageRoutingModule } from './place-edit-routing.module';

import { PlaceEditPage } from './place-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceEditPageRoutingModule
  ],
  declarations: [PlaceEditPage]
})
export class PlaceEditPageModule {}
