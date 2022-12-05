import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
=======
import { NgToastModule } from 'ng-angular-popup';

>>>>>>> 0cb8af4cb3dee93ca92aea805c2510697ec3c818

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { UserTypeService } from './services/user-type/user-type.service';

@NgModule({
  declarations: [
    AppComponent,
    AppLoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    HomeDashboardComponent,
    AdminDashboardComponent,
    HeaderComponent,
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
<<<<<<< HEAD
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
=======
    FormsModule,NgToastModule
>>>>>>> 0cb8af4cb3dee93ca92aea805c2510697ec3c818
  ],
  providers: [UserTypeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
