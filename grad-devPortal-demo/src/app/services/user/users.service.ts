import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

   URL='http://localhost:3000/signup';


   logIn(){
   return this.http.get<any>(this.URL);
   }



}
