import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainMessageComponent } from './components/main-message/main-message.component';
import { UsersMessagesComponent } from './components/main-message/users-messages/users-messages.component';
import { AuthGuard } from './shared/auth.guard';
import { TokenStorageService } from './services/token-storage.service';
import { MessageService } from './services/message.service';
import { NotificationHubService } from './services/notificationhub.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainMessageComponent,
    UsersMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserService, AuthGuard , TokenStorageService, MessageService, NotificationHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
