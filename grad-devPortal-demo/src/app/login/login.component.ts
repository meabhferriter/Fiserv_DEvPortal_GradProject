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
      role: new FormControl(['']),
    });
  }

  onLogin() {
    console.log(this.signInForm);
    this.http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          console.log(a.username, a.password, a.role);
          return (
            a.username === this.signInForm.value.username &&
            a.password === this.signInForm.value.password
          );
        });
        console.log(user);
        if (user) {
          // alert('login Success');
          this.popup.success({detail:"Success Message",summary:res.message,duration:5000});
          this.signInForm.reset();
          this.router.navigate(['/userDashboard']);
          // if (user.role === 'user') {
          //   
          // } else {
          //   this.router.navigate(['/adminDashboard']);
          // }
        } else {
          // alert('user not found');
          this.popup.error({detail:"Error Message",summary:"Login Failed,Try to Sign up !!",duration:5000});
          this.router.navigate(['/register']);
        }
      },
      (err) => {
        this.popup.error({detail:"Error Message",summary:"something went wrong!!",duration:5000});
  
      }
    );
  }

  onRegister() {
    console.log('register');
  }
}
