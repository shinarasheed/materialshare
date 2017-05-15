import {Injectable} from '@angular/core'
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//models
import {MyCourse} from '../model/mycourse.model';
 //Request header settings
 const headers = new Headers()
       headers.append('Content-Type', 'application/json');
      // headers.set('Content-Type', 'multipart/form-data');

@Injectable()
export class MaterialService{
   
    private _baseUrl; 
    private _user;
    constructor(private _http: Http){
        this._baseUrl = "http://localhost:3000/api/material"
        //Get the user details from the local storage
        this._user = JSON.parse(localStorage.getItem('user'));
    }
    
    getMaterials(){
        var userCourses = this._user.mycourseList;
        this._http.get(this._baseUrl+'?userCourses='+userCourses, {headers:headers}).map(res=>{res.json()});
    }
    postMaterialFiles(data):Observable<any>{
      return  this._http.post(this._baseUrl+'/file', data).map(res=>{res});
    }
    postMaterialDetails(data):Observable<any>{
        return this._http.post(this._baseUrl+'/details', JSON.stringify(data), {headers: headers}).map(res=>{res.json()});
    }
    

} 