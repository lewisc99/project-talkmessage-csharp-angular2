export class Message {
    Id?:string;
    FromId?:string;
    ToId?:string;
    Text?:string;
    Created?:Date;
    ToConnectionId?:string;

    constructor( fromId:string,toId:string,text:string)
    {
        this.FromId = fromId;
        this.ToId = toId;
        this.Text = text;
    }
}

