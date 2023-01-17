import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
providedIn: 'root',
})
export class UsersService {
private token:string;
loginCounter=0;
private tokenTimer:any;
private error:string ;

constructor(private http: HttpClient,private router:Router,
private popup:NgToastService) {}

URL = 'http://localhost:3000/signup';
URL1 = 'http://localhost:8000/user/login';
URL2='http://localhost:8000/user/signup';
Reset='http://localhost:8000/user/reset';

getToken(){
return console.log( this.token );
}

logIn() {
return this.http.get<any>(this.URL);
  }

  getError(){
  return this.error;
  }
  postRegistration(data:any) {
  console.log('data',data);
  this.http.post<{message:string,token:string}>(this.URL2,data)
    .subscribe(response=>{
    console.log(response.message,"token",response.token);
    },(err=>{
    console.log(err.error.meaasge );

    this.error= err.error.meaasge ;
    }))
    ;
    }
    ////

    getloginattempts(){
    return this.loginCounter;
    }
    // ..........................................................................
    logIn1(data: any) {
    this.http.post<{message: string;token:string,expiresIn:number,userId:any,merchant:string,loginAttempts:number}>
      (this.URL1,data)
      .subscribe( postData => {
      console.log(postData.loginAttempts,postData.token,postData.merchant);
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

      }
      },
      (err=>{
      console.log('error.loginAttempts',err.error.loginAttempts,'error.message',err.error.message,'id',err.error.userId);
      if(err.error.loginAttempts==1){
      this.loginCounter=+1;
      this.popup.error({detail:"error ",summary:"an incorect Password ",duration:2000})
      }
      if (err.error.loginAttempts==0)
      this.popup.error({detail:"error ",summary:"an incoorect username ",duration:2000})

      if (err.error.loginAttempts==2)
      {
      this.popup.error({detail:"error ",summary:"your are account locked ",duration:2000})
      this.loginCounter=5
      // const now =new Date();
      // this.loginCounter=err.error.loginAttempts;
      // console.log('counter',this.loginCounter);
      // const exp=new Date(now.getTime()+3600*1000);
      // this.saveAythlock(this.loginCounter,exp);
      }
      // else // this.router.navigate(['/userDashboard']);}
      // this.loginCounter=err.error.loginAttempts;
      // this.popup.error({detail:"error ",summary:"you are locked ",duration:2000})
      })

      );

      }
      logout(){
      this.router.navigate(['/login']);
      this.popup.success({detail:"Time session Ended",summary:"Login Inv Again !!",duration:2000});

      }
      // /////////////////////////
      resetPass(email:any ){

      this.http.post(this.Reset,email)
      .subscribe(result=>{
      console.log(result);

      })

      }

      // autoAuthUser(){
      // // const authinfo=this.getAuthDate();
      // const now =new Date();
      // const isInFuture=authinfo.exprationData>now;
      // if(isInFuture){
      // this.token=authinfo.token;
      // }
      // }
      private setAuthTimer(duration:number){
      this.tokenTimer=setTimeout(()=>{
      this.logout();
      },duration ,3000);
      }
      private saveAythData(token:string,exprationData:Date){

      localStorage.setItem("token",token);
      localStorage.setItem("expration",exprationData.toISOString());
      }
      private saveAythlock(lock:number,exprationData:Date){

      localStorage.setItem("lock time",lock.toLocaleString());
      localStorage.setItem("expration",exprationData.toISOString());
      }
      private clearAuth(){
      localStorage.removeItem("token");
      localStorage.removeItem("expration");

      }
      // private getAuthDate(){
      // const token=localStorage.getItem("token");
      // const exprationData=localStorage.getItem("expriation");
      // if (!token || !exprationData){

      // }
      // return {
      // token:token,
      // exprationData:new Date(exprationData)
      // }
      // }

      }