import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AlertService} from '../services/alert.service';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message: any;
  constructor(private _alertService: AlertService) { }

  ngOnInit() {
      this._alertService.getMessage().subscribe(message=>{this.message = message})
  }

}

@NgModule({
  declarations: [AlertComponent],
  imports: [  
              BrowserModule
            ],
  providers: [ AlertService] 
})

export  class AlertModule{}