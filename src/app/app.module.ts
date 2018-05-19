import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatGridListModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatTabsModule,
  MatSelectModule
} from '@angular/material';

import { DisplayDatePipe, DisplayDayPipe, DisplayTimePipe, DatetimePipe } from './pipes/display-date.pipe';
import { WeatherService } from './services/weather.service';
import { Globals } from './globals';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { NewsComponent } from './main/news/news.component';
import { WeatherComponent } from './main/weather/weather.component';
import { FeaturesComponent } from './main/features/features.component';
import { StickersComponent } from './main/stickers/stickers.component';
import { DialogComponent } from './main/features/dialog/dialog.component';
import { AddStickerDialogComponent } from './main/stickers/add-sticker-dialog/add-sticker-dialog.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { EditComponentsDialogComponent } from './main/edit-components-dialog/edit-components-dialog.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    // Components
    AppComponent,
    HeaderComponent,
    MainComponent,
    NewsComponent,
    WeatherComponent,
    FeaturesComponent,
    StickersComponent,
    // Pipes
    DisplayDatePipe,
    DisplayDayPipe,
    DisplayTimePipe,
    DatetimePipe,
    SafeHtmlPipe,
    // Dialogs
    DialogComponent,
    AddStickerDialogComponent,
    EditComponentsDialogComponent
  ],
  entryComponents: [
    DialogComponent,
    AddStickerDialogComponent,
    EditComponentsDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    WeatherService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
