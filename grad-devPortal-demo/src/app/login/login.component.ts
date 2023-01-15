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
        // if(this.server.getloginattempts()==0)
        //  { console.log('insde the login page==0 ',this.server.getloginattempts)
        //   this.server.logIn1(this.signInForm.value);
          this.signInForm.reset();
        }
      //   else{
      //       console.log('insde the login page ==3',this.server.getloginattempts);
            
      //     if(this.server.getloginattempts()==3){
      //         this.message=true;
      //         this.router.navigate(['/deactivate-user']);
      //   }
      // }
    }

    
  // }
  onRegister() {
    
    this.router.navigate(['/register']);
    console.log('register');

  }
} 