import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {UserData} from  "./user-data.model"
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:3000/signup';
  URL1 = 'http://localhost:8000/user/login';
  URL2='http://localhost:8000/user/signup';


  logIn() {
    return this.http.get<any>(this.URL);
  }

  postRegistration(data:any) {
    console.log('data',data);
    
    // const userDdata:UserData={username:data.value.username,firstname:data.value.firstname,lastname:data.value.lastname,marchent:data.valuse.marchent
    //  ,company:data.value.company,jobtitle:data.value.jobtitle,email:data.value.email};
    //  console.log('userDdata',userDdata);
    this.http.post<{message:string,token:string}>(this.URL2,data)
          .subscribe(response=>{
          console.log(response.message,"token",response.token);
          
        });
 }

  logIn1(data: any) {
    console.log(data);
    
    return this.http.post<{message: string;token:string}>(this.URL1,data)
    .subscribe(postData => {
      console.log(postData.message,postData.token);
      
    });
  }  

}
