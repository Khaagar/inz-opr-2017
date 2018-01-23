import { WebStorageModule } from 'ngx-store';
import { UsersComponent } from './components/users/users.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router'
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ObjectMapComponent } from './pages/object-map/object-map.component';
import { NewsComponent } from './pages/news/news.component';
import { AgmCoreModule } from '@agm/core';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    UsersComponent,
    LoginComponent,
    ContactComponent,
    ReservationsComponent,
    ObjectMapComponent,
    NewsComponent
  ],
  imports: [
    WebStorageModule,
    BrowserModule,
    routes, HttpModule, FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBAJtoD3BOH-6fm15cuCUyJ04ixzDVuXw'
    }),
    ToastModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
