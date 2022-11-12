import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { NotificationHubService } from 'src/app/services/notificationhub.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-main-message',
  templateUrl: './main-message.component.html',
  styleUrls: ['./main-message.component.css']
})
export class MainMessageComponent implements OnInit, OnDestroy {

  constructor(private storageToken:TokenStorageService, private messageService:MessageService,
    private notificationHubService:NotificationHubService, private fb:FormBuilder) { }
  

  public messages:Message[] = [];
  public firstUserId:string = this.storageToken.getUserId();
  public secondUserById:string;
  public formGroup:FormGroup;
  private messageSubscription:Subscription;
  private sendMessageSubscription:Subscription;
  private getMessageHubSubscription:Subscription;

  ngOnInit(): void {

    this.notificationHubService.notificationMessage();
    this.notificationHubService.userNotified();
    
     this.formGroup  = this.fb.group({
      messageText:  new FormControl("",Validators.maxLength(200))
    })
  }


  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
    this.sendMessageSubscription.unsubscribe();
    this.getMessageHubSubscription.unsubscribe();
  }
 

  SelectUserMessage(secondUserId:string)
  {
    this.secondUserById = secondUserId;

    this.messageSubscription =  this.messageService.getUserMessages(this.firstUserId,secondUserId).subscribe(
      (response:any) =>
      {
       console.log(response);
       console.log("main-message messages");
       return this.messages = response;
      
      },(error:any) =>
      {
        console.log("user-message error: " + error);
      }
    )

    this.getMessageHubSubscription =  this.notificationHubService.messages.subscribe(
      (data:any) =>
      {
       console.log("from container main-messages");
       var message:Message = new Message(data.fromId, data.toId,data.text);
       console.log(message);
        this.messages.push(message);
      }
    );
      
  }

 sendTextMessage()
  {
    var messageText =  this.formGroup.controls['messageText'].value;
    var message:Message  = new Message(this.firstUserId,this.secondUserById,messageText);
    console.log(message);
    this.formGroup.controls['messageText'].setValue('');
   this.sendMessageSubscription =   this.messageService.sendMessageToUser(message).subscribe(
        (response:any) =>
        {
          console.log("new Message Added");
          console.log(response);
          this.messages.push(response);
    },
        (error:any) =>
      {
            console.log(error);
        }
      )

  }







}
