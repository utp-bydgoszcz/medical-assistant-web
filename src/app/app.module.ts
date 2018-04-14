import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AgmCoreModule} from '@agm/core';
import {MapComponent} from './map/map.component';
import {AccordionModule, ModalModule} from 'ngx-bootstrap';
import {PersonModalComponent} from './modal/person-modal/person-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppService} from './service/app.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PersonModalComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAuNFy_pZ8-QWoQW6YxJep20QCEd0RR1vs'
    }),
    HttpClientModule,
    ReactiveFormsModule, FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
