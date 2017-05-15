import { BrowserModule } from '@angular/platform-browser';
import {FormBuilder, FormControl, AbstractControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MaterialListComponent} from './mini-feed.components/materiallist.component';
import {FeedRoutingModule} from './feed-routing.module';
import {HeaderComponent} from '../header/index'
import {FeedComponent} from './feed.component';

import {NoteService, MaterialService} from '../services/index';

@NgModule({
    declarations: [FeedComponent,  MaterialListComponent],
    imports: [
                FormsModule,
                ReactiveFormsModule,
                BrowserModule,
                FeedRoutingModule              
            ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [NoteService, MaterialService]
})
export class FeedModule{}