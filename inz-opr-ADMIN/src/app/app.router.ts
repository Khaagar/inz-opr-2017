import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component'


import { AppComponent } from './app.component';


export const router: Routes = [
    { path: '', component: MainComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);