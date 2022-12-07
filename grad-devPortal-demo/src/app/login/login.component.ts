import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class AppLoginComponent implements OnInit {
  signInForm: FormGroup;
  constructor(
    private router: Router,
    private http: HttpClient,
    private server: UsersService,
    private fb: FormBuilder,
    private popup:NgToastService
  ) {}

  ngOnInit(): void {
    //Initialise form
    // this.signInForm = new FormGroup({
    this.signInForm = this.fb.group({
      username: new FormControl([''], Validators.required),
      password: new FormControl([''], Validators.required),
      // role: new FormControl(['']),
    });
  }

  onLogin() {
    var ischecked=true;
    console.log(this.signInForm); 
   if(!this.signInForm.valid){
    for(var a in this,this.signInForm.get){
      this.signInForm.get(a).markAsTouched();
      this.signInForm.get(a).updateValueAndValidity();
     ischecked=false;
    }
   }  
  if(this.signInForm.valid){
    this.http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        let UserRole="";
        const user = res.find((a: any) => {
            console.log("user",a.role,this.signInForm.value.username);
             UserRole=a.role;       
              return  (a.username===this.signInForm.value.username
                      && a.password===this.signInForm.value.password);
                       }); 
                  console.log(user,UserRole);
                  if(user){
                     if( UserRole=="Manger"){
                        this.popup.success({detail:"Success Message",summary:'you are an Admin',duration:5000});
                        this.signInForm.reset();
                        this.router.navigate(['/adminDashboard']);
                  }else{
                    this.router.navigate(['/userDashboard']);
                    this.popup.success({detail:"Success Message",summary:"you are an user!!",duration:5000});
                  }}
                  else if(!user)     
                      {                         
                        this.popup.error({detail:"Error Message",summary:"Try again later!!!!!!",duration:5000});
                        this.router.navigate(['/register']);
                      }
          },err=>{
            this.popup.error({detail:"Error Message",summary:"Login Failed,try again later!!!!!!",duration:5000});
          });

      }}
   
  onRegister() {
    this.router.navigate(['/register']);
    console.log('register');
  }
}
