import {Injectable} from '@angular/core'
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//models
import {MyCourse} from '../model/mycourse.model';
 //Request header settings
 const headers = new Headers()
       headers.append('Content-Type', 'application/json');

@Injectable()
export class NoteService{
   
    private _baseUrl; 
    private _user;
    constructor(private _http: Http){
        this._baseUrl = "http://localhost:3000/api/note"
        //Get the user details from the local storage
        this._user = JSON.parse(localStorage.getItem('user'));
    }
    //Get all notes
    getNotes():Observable<any>{
        var userCourses = JSON.stringify(this._user.mycourseList);
        return this._http.get(this._baseUrl+'?userCourses='+userCourses, {headers:headers})
                        .map(res=>res.json());
    }
    
    

} 