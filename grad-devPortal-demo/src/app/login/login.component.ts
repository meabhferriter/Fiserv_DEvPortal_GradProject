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
    var ischecked=true;
    console.log(this.signInForm); 
   if(!this.signInForm.valid){
        this.popup.error({detail:"Error Message",summary:"Enter the username and Password !!!!!!",duration:5000});
       }  
  if(this.signInForm.valid){
    this.http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        let UserRole="";
        let check =false;
        let valid =false 
        let user = res.find((a: any) => {
            console.log("user",a.role,this.signInForm.value.username);
                          UserRole=a.role;    
                             if (a.username===this.signInForm.value.username
                              && a.password===this.signInForm.value.password)
                              { valid= true 
                                return  check=true;
                              } 
                             
                              else return check ;
                       }); //end the find 
                  console.log('user:',user,'userRole:',UserRole);
                  if(user){
                  if(check && valid){
                          if( UserRole=="Manger"){
                              this.popup.success({detail:"Success Message",summary:'you are an Admin',duration:5000});
                              this.signInForm.reset();
                              this.router.navigate(['/adminDashboard']);
                         }else{
                          this.router.navigate(['/userDashboard']);
                          this.popup.success({detail:"Success Message",summary:"you are user!!",duration:5000});
                        }
                      }
                      else if(!(check && valid))
                      {
                        this.popup.error({detail:"Error Message",summary:" username or passord wrong  !!!!!!",duration:5000}); }
                    }
                  else     
                      { 
                                    
                        this.popup.error({detail:"Error Message",summary:"you have to register first !!!!!!",duration:5000});
                        this.router.navigate(['/register']);
                      }
                   

          },err=>{
            this.popup.error({detail:"Error Message",summary:"Login Failed,try again later!!!!!!",duration:5000});
          });
        }
      // );
    }
  // }

  onRegister() {
    this.router.navigate(['/register']);
    console.log('register');
    this.router.navigate(['/register']);
  }
}
