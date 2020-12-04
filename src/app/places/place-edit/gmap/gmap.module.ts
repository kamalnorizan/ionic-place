import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GmapPageRoutingModule } from './gmap-routing.module';

import { GmapPage } from './gmap.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GmapPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAv9FC81xOVKdfeg4VwKIBBYJZLKPdutBY'
    })
  ],
  declarations: [GmapPage]
})
export class GmapPageModule {}
