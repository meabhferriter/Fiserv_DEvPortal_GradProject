import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserTypeService } from '../services/user-type/user-type.service';
import { UsersService } from '../services/user/users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class AppLoginComponent implements OnInit {
  signInForm: FormGroup;
  userType: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private server: UsersService,
    private fb: FormBuilder,
    private usertypeSerice: UserTypeService,
    private popup: NgToastService
  ) {}

  ngOnInit(): void {
    //Initialise form
    // this.signInForm = new FormGroup({
    this.signInForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onLogin() {
    // console.log(this.signInForm);
    this.http.get<any>('http://localhost:3000/signup').subscribe((res) => {
      const user = res.find((a: any) => {
        return (
          a.username === this.signInForm.value.username &&
          a.password === this.signInForm.value.password
        );
      });

      if (user) {
        // alert('login Success');
        console.log(user.role);
        this.usertypeSerice.raiseEventEmiiter(user.role);
        this.router.navigate(['/userDashboard']);
        this.popup.success({
          detail: 'Success Message',
          summary: res.message,
          duration: 5000,
        });
        this.signInForm.reset();
      } else {
        this.popup.error({
          detail: 'Error Message',
          summary: 'Login Failed,Try to Sign up !!',
          duration: 5000,
        });
        this.signInForm.reset();
        this.router.navigate(['/register']);
      }
      // if (user.role === 'user') {
      //
      // } else {
      //   this.router.navigate(['/adminDashboard']);
      // }
      // } else {
      // this.router.navigate(['/register']);
      // this.popup.error({detail:"Error Message",summary:"Login Failed,Try to Sign up !!",duration:5000});

      // }
      // },
      // (err) => {
      // this.popup.error({detail:"Error Message",summary:"something went wrong!!",duration:5000});

      // }
      // );
    });
  }

  onRegister() {
    console.log('register');
    this.router.navigate(['/register']);
  }
}
