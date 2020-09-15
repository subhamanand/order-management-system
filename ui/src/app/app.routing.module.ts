import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


const appRoutes: Routes = [
    { path: '', component: DashboardComponent } ,

    { path: 'dashboard', component: DashboardComponent },


]

@NgModule({

    imports: [
        RouterModule.forRoot(appRoutes, {
            onSameUrlNavigation: 'reload'
          })
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule{

}