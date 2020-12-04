import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceEditPage } from './place-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceEditPage
  },
  {
    path: 'gmap',
    loadChildren: () => import('./gmap/gmap.module').then( m => m.GmapPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceEditPageRoutingModule {}
