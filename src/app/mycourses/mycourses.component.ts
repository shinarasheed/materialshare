import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Response, HttpModule} from '@angular/http';
import{Router, RouterModule} from '@angular/router';
import {FormBuilder, FormControl, AbstractControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertComponent} from '../alert/alert.component';
//Custom Validator
import {CustomValidate} from '../authenticate/customValidator';
//Model
import { User, CourseList } from '../model/user.model'
//Service
import {UserService}  from '../services/user.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MycoursesComponent implements OnInit{
    
    courseListForm: FormGroup;
    courseCode: AbstractControl;
    courseList: CourseList[];
    loading: boolean;
    user;
    constructor(fb: FormBuilder, private _userSerivce: UserService, 
                    private _alertService: AlertService,  private _route: Router) {
      
        this.courseListForm = fb.group({
          'courseCode': ['', Validators.compose([Validators.required, CustomValidate.coursecodeFormat])]
        });
        this.courseCode = this.courseListForm.controls['courseCode'];
        this.loading = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        //this.courseList = []
    }
    ngOnInit(){
        //On init get users course list
        this._userSerivce.getCourseList().subscribe((res)=>{                            
                                if(res.state=='success'){
                                    this.courseList = res.doc;        
                                }else{
                                    this._alertService.error(res.mesg, true);
                                }
                          },
                          (err)=>{
                              this._alertService.error("Could not signup now, try again later", true);
                          });
    }
    //Add Course to course list  
    addCourseToList(value):void{
        //console.log(value)
        this.courseList.push(value.courseCode);        
    }
    //Remove a course from course list
    removeCourseFromList(index):void{
        this.courseList.splice(index, 1);
    }
    //Submit course list
    submitCourseList():void{
        if(this.courseList.length== 0){
            this._route.navigateByUrl('/feed');  
        }else{
            this.loading = true;
            console.log(this.courseList);

            this._userSerivce.updateCourseList(this.courseList)
                          .subscribe((res)=>{ 
                                //check and respond to error state                           
                                switch(res.state){
                                    //if success redirect to feed page
                                    case 'success': 
                                         if(this.user){                                             
                                             this.user.mycourseList = this.courseList;
                                             localStorage.setItem('user', JSON.stringify(this.user));
                                         }
                                         this._route.navigateByUrl('/feed');
                                         break;
                                    // if failure alert error mesg
                                    case 'failure':
                                          this._alertService.error(res.mesg, true);
                                          this.loading = false;
                                          break;
                                    //if login-failure (User authentication fail)  
                                    //alert the error mesg and after 5s redirect user back to login page
                                    case 'login-failure':
                                          this._alertService.error(res.mesg, true);
                                          var reDirectUser = function(route){
                                                localStorage.removeItem('user');
                                                console.log("I was here after 5s");
                                                route.navigateByUrl('/index');
                                          }
                                          setTimeout(reDirectUser(this._route), 120000)
                                          
                                          this.loading = false;
                                          break;
                                    //if no error state match alert default mesg
                                    default:
                                        this._alertService.error("Could not update courses now, try again later", true);
                                        this.loading = false;       
                                }
                          },
                          (err)=>{
                              this._alertService.error("Could not signup now, try again later", true);
                              this.loading = false;
                          })
        }
    }
}

@NgModule({
  declarations: [MycoursesComponent, AlertComponent],
  imports: [  FormsModule,
              ReactiveFormsModule, 
              HttpModule,
              BrowserModule,
              RouterModule
            ],
  providers: [UserService, AlertService] 
})

export  class MyCoursModule{}