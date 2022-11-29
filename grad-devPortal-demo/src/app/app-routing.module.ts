import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { AppLoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const appRoutes: Routes = [
  { path: '', component: AppLoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'homeDashboard', component: HomeDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
