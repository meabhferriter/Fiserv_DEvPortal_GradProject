import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserTypeService } from '../services/user-type/user-type.service';
import { UsersService } from '../services/user/users.service';
// import { UsersService } from '../users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-deactivate-user',
  templateUrl: './deactivate-user.component.html',
  styleUrls: ['./deactivate-user.component.css']
})
export class DeactivateUserComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private router: Router,
    private http: HttpClient,
    private server: UsersService,
    private fb: FormBuilder,
    private usertypeSerice: UserTypeService,
    private popup: NgToastService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }
  }

