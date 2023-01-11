import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
// import {UserData} from  "./user-data.model"
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private token:string;
  loginCounter=0;
  private tokenTimer:any;


  constructor(private http: HttpClient,private router:Router,
    private popup:NgToastService) {}

  URL = 'http://localhost:3000/signup';
  URL1 = 'http://localhost:8000/user/login';
  URL2='http://localhost:8000/user/signup';
 
 getToken(){
   return  console.log( this.token );
   }

  logIn() {
    return this.http.get<any>(this.URL);
  }
  postRegistration(data:any) {
    console.log('data',data);
      this.http.post<{message:string,token:string}>(this.URL2,data)
          .subscribe(response=>{
            console.log(response.message,"token",response.token);
        });
 }
// ..........................................................................
  logIn1(data: any) {
    return this.http.post<{message: string;token:string,expiresIn:number,userId:any}>(this.URL1,data)
           .subscribe( postData => {
             console.log(postData.userId,postData.token);
              this.token=postData.token;
              const exprationDuration:any= this.setAuthTimer(postData.expiresIn);
        
     
                if(this.token){
                    const expire=postData.expiresIn;
                    console.log(this.token ,expire,"UserId",postData.userId);
                    this.popup.success({detail:"Success Message",summary:"user autharazation !!",duration:2000});
                    this.router.navigate(['/userDashboard']);
                    const now =new Date();
                    const exp=new Date(now.getTime()+exprationDuration*1000);
                    this.saveAythData(this.token,exp);
                }else{      
                  console.log("UserId",postData.userId,postData.message);
          }
       });
  }  
logout(){
  this.router.navigate(['/login']);
  this.popup.success({detail:"Time session Ended",summary:"Login Inv Again !!",duration:2000});

}


// autoAuthUser(){
//   // const authinfo=this.getAuthDate();
//   const now =new Date();
//    const isInFuture=authinfo.exprationData>now;
//    if(isInFuture){
//     this.token=authinfo.token;
//    }
// }
private setAuthTimer(duration:number){
  this.tokenTimer=setTimeout(()=>{
    this.logout();
},duration ,3000);
}
private  saveAythData(token:string,exprationData:Date){

  localStorage.setItem("token",token);
  localStorage.setItem("expration",exprationData.toISOString());
}
private clearAuth(){
  localStorage.removeItem("token");
  localStorage.removeItem("expration");

}
// private getAuthDate(){
//   const token=localStorage.getItem("token");
//   const exprationData=localStorage.getItem("expriation");
//   if (!token || !exprationData){
    
//    }
//   return {
//     token:token,
//     exprationData:new Date(exprationData)
//   }
// }

}
