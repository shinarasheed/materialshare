import {Injectable} from '@angular/core'
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//models
import {User} from '../model/user.model';
import {MyCourse} from '../model/mycourse.model'
 //Request header settings
 const headers = new Headers()
       headers.append('Content-Type', 'application/json');

@Injectable()
export class UserService{
   
    private _baseUrl; 
    private _user;
    constructor(private _http: Http){
        this._baseUrl = "http://localhost:3000/api/user/"
        //Get the user details from the local storage
        this._user = JSON.parse(localStorage.getItem('user'));
    }
    
    //Get user list of courses
    getCourseList():Observable<any>{
        return this._http.get(this._baseUrl+'mycourse/'+this._user._id, {headers: headers})
                            .map(res=> res.json());
    }
    //Update  user course list
    updateCourseList(courseList):Observable<any>{
        return this._http.put(this._baseUrl+'mycourse/'+this._user._id, 
                                JSON.stringify({mycourseList: courseList}), {withCredentials: true, headers: headers})
                                .map(res=> res.json());
    }

} 