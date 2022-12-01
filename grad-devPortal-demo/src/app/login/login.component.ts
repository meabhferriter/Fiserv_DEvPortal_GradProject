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
    private fb: FormBuilder
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
        console.log(this.signInForm);

        if (user) {
          alert('login Success');
          this.signInForm.reset();
          if (user.role === 'user') {
            this.router.navigate(['/userDashboard']);
          } else {
            this.router.navigate(['/adminDashboard']);
          }
        } else {
          alert('user not found');
          this.signInForm.reset();
        }
      },
      (err) => {
        alert('something went wrong ');
      }
    );
  }

  onRegister() {
    console.log('register');
  }
}
