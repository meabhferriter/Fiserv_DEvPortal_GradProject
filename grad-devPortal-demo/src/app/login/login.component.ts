import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class AppLoginComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private router: Router) {}

  ngOnInit(): void {
    //Initialise form
    this.signInForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onLogin() {
    console.log(this.signInForm);

    this.router.navigate(['/homeDashboard']);
  }

  onRegister() {
    console.log('register');
  }
}
