import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      username: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.resetForm.value);
  }
}
