import {FormControl} from '@angular/forms'


export class CustomValidate{
    //Check if matric number is nicely formatted like (BDG/14/8521)
    static matricNumFormat(control: FormControl){
        if(!/^[A-Z|a-z]{3}\/\d{2}\/\d{4}$/.test(control.value)){
            return {matricNumFormat: true}
        }
    }
    //Check if matric number already exist.
    static matricNumExist(control: FormControl){

    }
    //Check if email is nicely formatted as email (myemail@url.com)
    static emailFormat(control: FormControl){
        if(!/^\w+@[a-z]+.com$/.test(control.value)){
            return {emailFormat: true}
        }
    }
    //Check if phone number is nicely formatted as number (08137483474).
    static phoneNumFormat(control: FormControl){
        if(!/^\d{11}$/.test(control.value)){
            return {phoneNumFormat: true}
        }
    }
    //Check if coursecode is nicely formatted (BDG204)
    static coursecodeFormat(control: FormControl){
        if(!/^[A-Z|a-z]{3}\d{3}$/.test(control.value)){
            return {courseCodeFormat: true}
        }
    }
}