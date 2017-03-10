import { NgModule }   from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import {AuthenticateComponent} from './authenticate/authenticate.component';
import {MycoursesComponent} from './mycourses/mycourses.component';
import {WriteComponent} from './write/write.component';
import {RequestComponent} from './request/request.component';
import {SettingsComponent} from './settings/settings.component';
import {UploadComponent} from './upload/upload.component';
import {ProfileComponent} from './profile/profile.component';
import {NotificationComponent} from './notification/notification.component';
import {SearchComponent} from './search/search.component';
import {CoursemateComponent} from './coursemate/coursemate.component';

//route guard
import {AuthGuard} from './guard/auth.guard';

const appRoute = [
    {path:'', redirectTo: 'index', pathMatch: 'full'},
    {path:'index', component: AuthenticateComponent},    
    {path:'mycourses', component: MycoursesComponent, canActivate: [AuthGuard]},    
    {path:'write', component: WriteComponent, canActivate: [AuthGuard]},
    {path:'request', component: RequestComponent, canActivate: [AuthGuard]},
    {path:'coursemates', component: CoursemateComponent, canActivate: [AuthGuard]},
    {path: 'upload', component: UploadComponent, canActivate: [AuthGuard]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
    {path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'notification', component: NotificationComponent, canActivate: [AuthGuard]},
    {path: 'settings', component: NotificationComponent, canActivate: [AuthGuard]}   
]

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})

export class AppRoutingModule{}