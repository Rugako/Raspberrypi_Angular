import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScreenComponent} from '../views/screen/screen.component';
import {HomeComponent} from '../views/home/home.component';
import {TempratureComponent} from '../views/temprature/temprature.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'screen', component: ScreenComponent},
  {path: 'temp', component: TempratureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
