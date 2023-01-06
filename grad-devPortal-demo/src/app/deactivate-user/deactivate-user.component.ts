import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTypeService } from '../services/user-type/user-type.service';
import { UsersService } from '../services/user/users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-deactivate-user',
  templateUrl: './deactivate-user.component.html',
  styleUrls: ['./deactivate-user.component.css']
})
export class DeactivateUserComponent implements OnInit {
  activate: FormGroup;
  id:string;
  Pass:string ;
  message:boolean=false;

  loginCounter=0;
  role:string ;
  constructor(
    private router: Router,
    private route:ActivatedRoute,

    private http: HttpClient,
    private server: UsersService,
    private fb: FormBuilder,
    private usertypeSerice: UserTypeService,
    private popup: NgToastService
  ) {}

  ngOnInit(): void {
    this.activate = this.fb.group({
      // username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),

    });
    this.id=this.route.snapshot.paramMap.get('id');
    console.log('we pass the id ' ,this.id);
      }

  activateUser(){
    console.log(this.activate); 
      if(!this.activate.valid){
            this.popup.error({detail:"Error Message",summary:"Enter the username and Password !!!!!!",duration:5000});
          }  
      // if(this.activate.valid){
      //   this.server.logIn().subscribe(
      //     (res) => {
      //     let user = res.find((a: any) => {
      //       console.log('a.id',a.id);
            
      //                  if(this.id === a.id && a.password === this.activate.value.password ){
      //                    console.log('we found the id ',a.id)
      //                     this.role=a.role;
      //                   return this.Pass=a.password;
      //                  }
      //                  else return
                        
    
      //              });//end find
      //              console.log('this.Pass',this.Pass);
                   
      //               if(user){
                    
      //                    if( this.role=="Manger"){
      //                     this.popup.success({detail:"Success Message",summary:'you are an Admin',duration:5000});
      //                     this.activate.reset();
      //                     this.router.navigate(['/adminDashboard']);
      //                    }else{
      //                    this.router.navigate(['/userDashboard']);
      //                     this.popup.success({detail:"Success Message",summary:"you are user!!",duration:5000});
      //                    }
      //                 }//end if 
                    
      //              if(user === undefined){
                      
      //               if(this.loginCounter<3){
      //                 // this.popup.error({detail:"Error Message",summary:" username or passord wrong  !!!!!!",duration:5000});
      //                 this.loginCounter+=1;
      //                 this.message=true;
      //              }
      //               else{ 
      //                 this.router.navigate(['/register']);
      //                 }
      //                 if(this.loginCounter===3)
      //               this.popup.error({detail:"Error Message",summary:"Your account deactivated now !",duration:5000});
      //               }              
                  
      //           });



        }



  }

// }