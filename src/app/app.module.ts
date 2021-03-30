import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './theme/header/header.component';
import { ScreenComponent } from './views/screen/screen.component';
import { FooterComponent } from './theme/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpWrapper} from './api/HttpWrapper';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { HomeComponent } from './views/home/home.component';
import { TempratureComponent } from './views/temprature/temprature.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScreenComponent,
    FooterComponent,
    HomeComponent,
    TempratureComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        DataTablesModule
    ],
  providers: [HttpClientModule, HttpWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
