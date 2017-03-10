import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {HeaderComponent, TopNavComponent, HeaderModule} from './header/index';

import { AuthModule } from './authenticate/authenticate.component';
import { MyCoursModule } from './mycourses/mycourses.component';
import {FeedModule} from './feed/feed.module';
import { CoursemateModule } from './coursemate/coursemate.module';

 
import {AuthGuard} from './guard/auth.guard';

import {AppRoutingModule} from './app-routing.module';

import { WriteComponent } from './write/write.component';
import { RequestComponent } from './request/request.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';
import { UploadComponent } from './upload/upload.component';
import { SettingsComponent } from './settings/settings.component'


@NgModule({
  declarations: [
    AppComponent,
    WriteComponent,
    RequestComponent,
    SearchComponent,
    ProfileComponent,
    NotificationComponent,
    UploadComponent,
    HeaderComponent,
    TopNavComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AuthModule,
    MyCoursModule,
    //HeaderModule,
    FeedModule,
    CoursemateModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
