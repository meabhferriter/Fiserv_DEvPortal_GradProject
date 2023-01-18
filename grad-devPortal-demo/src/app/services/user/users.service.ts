import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private token: string;
  loginCounter = 0;
  private error: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private popup: NgToastService
  ) {}

  URL1 = 'http://localhost:8000/user/login';
  URL2 = 'http://localhost:8000/user/signup';
  Reset = 'http://localhost:8000/user/reset';

  getToken() {
    return console.log(this.token);
  }

  getError() {
    return this.error;
  }
  postRegistration(data: any) {
    this.http
      .post<{ message: string; token: string }>(this.URL2, data)
      .subscribe(
        (response) => {},
        (err) => {
          console.log(err.error.meaasge);

          this.error = err.error.meaasge;
        }
      );
  }

  // ..........................................................................
  logIn(data: any) {
    this.http
      .post<{
        message: string;
        token: string;
        expiresIn: number;
        userId: any;
        merchant: string;
        loginAttempts: number;
      }>(this.URL1, data)
      .subscribe(
        (postData) => {
          console.log(
            postData.loginAttempts,
            postData.token,
            postData.merchant
          );
          this.token = postData.token;
          const exprationDuration: any = this.setAuthTimer(postData.expiresIn);

          if (this.token) {
            this.popup.success({
              detail: 'Success Message',
              summary: 'Authorization  !!',
              duration: 2000,
            });

            this.router.navigate(['/userDashboard']);
            const now = new Date();
            const exp = new Date(now.getTime() + exprationDuration * 1000);
            this.saveAythData(this.token, exp);
          }
        },
        (err) => {
          this.loginCounter = +1;
          if (err.error.loginAttempts === 1) {
            this.popup.error({
              detail: 'Error ',
              summary: 'Incorrect Password',
              duration: 2000,
            });
          } else if (err.error.loginAttempts === 0)
            this.popup.error({
              detail: 'Error ',
              summary: 'Incorrect UserName! ',
              duration: 2000,
            });
          else if (err.error.loginAttempts === 2) {
            if (this.loginCounter === 5) {
              this.popup.error({
                detail: 'Error',
                summary: 'Your Account Locked',
                duration: 2000,
              });
              this.router.navigate(['/deactivate-user']);
            }
            this.popup.error({
              detail: 'Error',
              summary: 'Your Account Locked',
              duration: 2000,
            });
            return;
          }
        }
      );
  }

  logout() {
    this.router.navigate(['/login']);
    this.popup.success({
      detail: 'Time session Ended',
      summary: 'Login again',
      duration: 2000,
    });
  }
  resetPass(email: any) {
    this.http.post(this.Reset, email).subscribe((result) => {
      console.log(result);
    });
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }
  private saveAythData(token: string, exprationData: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expration', exprationData.toISOString());
  }
}
