import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppLoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DeactivateUserComponent } from './deactivate-user/deactivate-user.component';

const appRoutes: Routes = [
  { path: '', component: AppLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component:AppLoginComponent },

  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'userDashboard', component: HomeDashboardComponent },
  { path: 'deactivate-user', component: DeactivateUserComponent },
  { path: 'deactivate-user/:id', component: DeactivateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
