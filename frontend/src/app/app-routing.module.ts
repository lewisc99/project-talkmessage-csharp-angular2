import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainMessageComponent } from './components/main-message/main-message.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"",component:HomeComponent},
  {path:"message", component:MainMessageComponent,canActivate:[AuthGuard]},
  {path:"logout", redirectTo:"",pathMatch:"full"},
  {path:"**", redirectTo:"",pathMatch:"full"}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
