import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormBuilder, FormControl, AbstractControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Response, HttpModule} from '@angular/http';
import {Router} from '@angular/router'
//Model
import {User} from '../model/user.model';
//Authentication Service
import {AuthService} from '../services/index'
//Custom Validator 
import {CustomValidate} from './customValidator'

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit{
  //New student signup form
  signUpForm: FormGroup;
  //Student form controls 
  matricNum: AbstractControl;
  password: AbstractControl;
  name: AbstractControl;
  email: AbstractControl;
  phoneNum: AbstractControl;
  school: AbstractControl;

  loading: boolean

  constructor(private _auth: AuthService, private _route: Router, fb: FormBuilder) { 
      this.signUpForm = fb.group({
          //Validation function for each form control
          'matricNum': ['', Validators.compose([
                                Validators.required,
                                CustomValidate.matricNumFormat
                             ])],
          'password':  ['', Validators.compose([
                                Validators.required
                             ])],
          'name': ['', Validators.compose([
                                Validators.required
                             ])],
          'email': ['', Validators.compose([
                                Validators.required,
                                CustomValidate.emailFormat   
                             ])],
          'phoneNum': ['', Validators.compose([
                                Validators.required,
                                CustomValidate.phoneNumFormat
                             ])],
          'school': ['', Validators.compose([
                                Validators.required
                             ])]
      });
      //Read in each form controls to various form properties
      this.matricNum = this.signUpForm.controls['matricNum'];
      this.password = this.signUpForm.controls['password'];
      this.name = this.signUpForm.controls['name'];
      this.email = this.signUpForm.controls['email'];
      this.phoneNum = this.signUpForm.controls['phoneNum'];
      this.school = this.signUpForm.controls['school'];      
      
      this.loading = false;
  }
   ngOnInit(){
      
  }
  //Handle new student form submission
  onSubmit(values: User){
      this._auth.signup(values).subscribe(
        (res)=>{
            if(res.state=='success'){
                console.log("Thank you for signing up " + res.user.matricNum);
                localStorage.setItem('user', JSON.stringify( res.user));
                this._route.navigateByUrl("/mycourses");
            }
        },
        (err)=>{
            console.log("Could not signup now, try again later")
        },
        ()=>{
           console.log("Completed....")  
        }
      );
  }
  login(loginDetails){
      if(loginDetails){
            
            this.loading = true;
            this._auth.login(loginDetails).subscribe((res)=>{
            if(res.state=='success'){
                console.log("Thank you for signing in " + res.user.matricNum);
                localStorage.setItem('user', JSON.stringify( res.user));
                this._route.navigateByUrl("/feed");
            }else{
                this.loading = false;
                console.log(res.message);
            }
        },
        (err)=>{
            this.loading = false;
            console.log("Could not signup now, try again later")
        },
        ()=>{
            this.loading = false;
           console.log("Completed....")  
        });
      }
  }
  logout(){
      localStorage.removeItem('user')
      
      //redirect back to index page
      this._route.navigateByUrl("/index")
  }

}

@NgModule({
  declarations: [AuthenticateComponent],
  imports: [  FormsModule,
              ReactiveFormsModule, 
              HttpModule,
              BrowserModule
            ],
  providers: [AuthService]  
})

export  class AuthModule{}
