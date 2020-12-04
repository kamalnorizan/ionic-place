import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesPage
  },
  {
    path: 'placedetail/:placeId',
    loadChildren: () => import('./place-detail/place-detail.module').then( m => m.PlaceDetailPageModule)
  },
  {
    path: 'placeedit/:placeId',
    loadChildren: () => import('./place-edit/place-edit.module').then( m => m.PlaceEditPageModule)
  },
  {
    path: 'segment',
    loadChildren: () => import('./segment/segment.module').then( m => m.SegmentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
