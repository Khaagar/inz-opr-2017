import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component'


import { AppComponent } from './app.component';
import { OrlicConfigurationComponent } from './pages/orlic-configuration/orlic-configuration.component';
import { EditOrlikComponent } from './pages/orlic-configuration/edit-orlik/edit-orlik.component';


export const router: Routes = [
    { path: '', component: MainComponent },
    { path: 'orliks-config', component: OrlicConfigurationComponent},
    { path: 'orlik-edit/:id', component: EditOrlikComponent}
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);