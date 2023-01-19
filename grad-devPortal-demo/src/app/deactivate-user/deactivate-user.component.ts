import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-deactivate-user',
  templateUrl: './deactivate-user.component.html',
  styleUrls: ['./deactivate-user.component.css'],
})
export class DeactivateUserComponent implements OnInit {
  activate: FormGroup;
  id: string;
  Pass: string;
  message: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private popup: NgToastService
  ) {}

  ngOnInit(): void {
    this.activate = this.fb.group({
      password: new FormControl(null, Validators.required),
    });
  }

  activateUser() {
    console.log(this.activate);
    if (!this.activate.valid) {
      this.popup.error({
        detail: 'Error Message',
        summary: 'Enter Your correct Passowrd',
        duration: 5000,
      });
    }
  }
}
