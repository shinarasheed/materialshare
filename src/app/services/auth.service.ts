import {Injectable} from '@angular/core'
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/observable'
import 'rxjs/add/operator/map';

//models
import {User} from '../model/user.model';
import {MyCourse} from '../model/mycourse.model'
let header = new Headers();

@Injectable()
export class AuthService{

    private _urlBase; //Base url for authentication

    constructor(private _http: Http){
        this._urlBase = "http://localhost:3000/auth"
    }
    //login user
    login(loginDetails){
        header.append('Content-Type', 'application/json')
        return this._http.post(this._urlBase+'/login', JSON.stringify(loginDetails), {headers: header})
                         .map(res=> res.json());
    }
    //signup user
    signup(user: User):Observable<any>{
    	header.append('Content-Type', 'application/json')
        return this._http.post(this._urlBase+'/signup', JSON.stringify(user), {headers: header})
                         .map(res=> res.json());
    }
    //Check if user is authenticated
    isAuth():Observable<any>{
        //return the status code as an observable
        return this._http.get(this._urlBase+'/isAuth').map(res=>res);
    }
} 