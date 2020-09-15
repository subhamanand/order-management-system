import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatRippleModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChartModule } from 'angular-highcharts';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatTabsModule} from '@angular/material/tabs';

import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent

  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    NgxAudioPlayerModule,
    MatRippleModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    ChartModule,
    NgxSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatSelectModule

  ],
  // providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
