import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/user/users.service';

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
    public server: UsersService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //Initialise form
    this.signInForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  logIn() {
    console.log(this.signInForm.value);
    if (this.signInForm.invalid) {
      return;
    } else {
      this.server.logIn(this.signInForm.value);
      this.signInForm.reset();
    }
  }
  onRegister() {
    this.router.navigate(['/register']);
  }
}
