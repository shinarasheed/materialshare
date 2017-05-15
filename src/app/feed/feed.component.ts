import { Component, OnInit, ElementRef, Input } from '@angular/core';
import {FormBuilder, FormControl, AbstractControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Response, HttpModule} from '@angular/http';
import {MaterialService} from '../services/index';
//Custom Validator 
import {CustomValidate} from '../authenticate/customValidator';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  //New Material FormGroup
  addMaterialForm: FormGroup;
  //Material form controls
  materialTopic: AbstractControl;
  materialCourseCode: AbstractControl;
  materialType: AbstractControl;
  materialDescription: AbstractControl;
  selectedFiles;

  constructor(private _fb: FormBuilder,  private _materialService: MaterialService) {
      this.addMaterialForm = this._fb.group({
            //Validation function for each form control
            'materialTopic': ['', Validators.compose([
                                Validators.required
                            ])],
            'materialCourseCode': ['', Validators.compose([
                                Validators.required
                            ])],
            'materialDescription': ['', Validators.compose([
                                Validators.required
                            ])],
            'materialType': ['', Validators.compose([
                                Validators.required
                            ])],
              
      });
      //Read in each form controls to various form properties
      this.materialTopic = this.addMaterialForm.controls['materialTopic'];
      this.materialCourseCode = this.addMaterialForm.controls['materialCourseCode'];
      this.materialDescription = this.addMaterialForm.controls['materialDescription'];
      this.materialType = this.addMaterialForm.controls['materialType'];
      this.selectedFiles = [];
  }

  ngOnInit() {

  }
  uploadMaterial($event){
       //if any file was selected
       if($event.target.files.length > 0){
           //set the array of selected files
           this.selectedFiles = $event.target.files;
           let formData = new FormData;
            var fileLength = this.selectedFiles.length
            var i = 0
             while(fileLength > i){
                formData.append('files', this.selectedFiles.item(i));                
                i++;
            }
            this.upload(formData);
           
             console.log(this.selectedFiles);
       }else{
           console.log("No files selected");
       }

  }     
  upload(formData: FormData){
      this._materialService.postMaterialFiles(formData)
                .subscribe((res)=>{
                    console.log(res);
                })
  }
  //Handle new Material form submission  
  onSubmitMaterialForm(data){
      console.log(data)
      this._materialService.postMaterialDetails(data)
                .subscribe((res)=>{
                    console.log(res);
                })
  }
}
