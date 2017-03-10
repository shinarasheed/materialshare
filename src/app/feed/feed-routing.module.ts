import { NgModule }   from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import {FeedComponent} from './feed.component';

const feedRoute = [
    {path:'feed', component: FeedComponent},
    {path:'feed/:id', component: FeedComponent}
]

@NgModule({
    imports: [RouterModule.forChild(feedRoute)],
    exports: [RouterModule]
})

export class FeedRoutingModule{}