import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  NgForm,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTypeService } from '../services/user-type/user-type.service';
import { UsersService } from '../services/user/users.service';
// import { UsersService } from '../users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class AppLoginComponent implements OnInit {
  signInForm: FormGroup;
  userType: string;
  loginCounter=0;
  
  message:boolean=false;
  message1:boolean=false;

  id:string;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    public server: UsersService,
    private fb: FormBuilder,
    private popup: NgToastService
  ) {}

  ngOnInit(): void {
    //Initialise form
    this.signInForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

   
  }

  login(){
    
   console.log(this.signInForm.value);
     if (this.signInForm.invalid)
            { return ;}
    else{
         this.server.logIn1(this.signInForm.value);
            if(this.server.loginCounter>1 && (this.server.loginCounter<5)){
                this.message=true;
               }
            if(this.server.loginCounter==5)
              {
                this.router.navigate(['/deactivate-user']);
              }
            if(this.server.loginCounter>5 ){
                this.message1=true;
                this.signInForm.reset();
              }

        }
          }
  onRegister() {
    
    this.router.navigate(['/register']);
    console.log('register');

  }
} 