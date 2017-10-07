import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router'

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    routes

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
