import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {HeaderModule, HeaderComponent} from '../header/index';
import {CoursemateComponent} from './coursemate.component'

import {UserService} from '../services/index';

@NgModule({
    declarations: [CoursemateComponent],
    imports: [  
                BrowserModule
            ],
    bootstrap: [],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CoursemateModule{}