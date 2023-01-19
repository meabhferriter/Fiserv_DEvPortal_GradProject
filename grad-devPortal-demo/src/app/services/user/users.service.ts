import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private token: string;

  private error: string;
  tokenTimer: NodeJS.Timeout;
  loginCounter = 0;
  durationPopUpMessage = 2000;
  constructor(
    private http: HttpClient,
    private router: Router,
    private popup: NgToastService
  ) {}

  URL1 = 'http://localhost:8000/user/login';
  URL2 = 'http://localhost:8000/user/signup';

  getError() {
    return this.error;
  }
  postRegistration(data: any) {
    this.http
      .post<{ message: string; token: string }>(this.URL2, data)
      .subscribe(
        (response) => {
          console.log(response.message);
        },
        (err) => {
          console.log(err.error.meaasge);

          this.error = err.error.meaasge;
        }
      );
  }

  logIn(data: any) {
    this.http
      .post<{
        message: string;
        token: string;
        expiresIn: number;
        loginAttempts: number;
      }>(this.URL1, data)
      .subscribe(
        (postData) => {
          this.token = postData.token;
          const exprationDuration: any = this.setAuthTimer(postData.expiresIn);
          if (this.token) {
            this.popup.success({
              detail: 'Success Message',
              summary: 'Authorization  !!',
              duration: this.durationPopUpMessage,
            });

            this.router.navigate(['/userDashboard']);
            const now = new Date();
            const exp = new Date(now.getTime() + exprationDuration * 1000);
            this.saveAythData(this.token, exp);
          }
        },
        (err) => {
          ++this.loginCounter;
          if (err.error.loginAttempts === 1) {
            this.popup.error({
              detail: 'Error ',
              summary: 'Incorrect Password',
              duration: this.durationPopUpMessage,
            });

            if (this.loginCounter == 3) {
              this.router.navigate(['/deactivateUser']);
              this.popup.error({
                detail: 'Error',
                summary: '',
                duration: this.durationPopUpMessage,
              });
            }
          } else if (err.error.loginAttempts === 0)
            this.popup.error({
              detail: 'Error ',
              summary: 'Incorrect UserName! ',
              duration: this.durationPopUpMessage,
            });
          else if (err.error.loginAttempts === 2) {
            this.popup.error({
              detail: 'Error',
              summary: 'Your Account Locked',
              duration: this.durationPopUpMessage,
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
      duration: this.durationPopUpMessage,
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
