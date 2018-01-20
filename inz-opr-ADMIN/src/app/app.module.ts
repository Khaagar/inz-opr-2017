import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { OrlicConfigurationComponent } from './pages/orlic-configuration/orlic-configuration.component';
import { EditOrlikComponent } from './pages/orlic-configuration/edit-orlik/edit-orlik.component';
import { AddOrlikModalComponent } from './pages/add-orlik-modal/add-orlik-modal.component';
import { FormsModule } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    OrlicConfigurationComponent,
    EditOrlikComponent,
    AddOrlikModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routes

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
