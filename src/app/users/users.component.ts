import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';
declare var $:any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;

  constructor(public fb:FormBuilder, private service:CommonService){
    this.userForm = this.fb.group({
      Name:[""],
      Email:[""],
      Mobile:[""],
      Age:[""],
    })
  }
  ngOnInit(): void {
    this.GetAllUsers();
  }

  SubmitForm(){
    //console.log(this.userForm.value);
    var type = this.userForm.value.id==null?'Add':'Upadate';
    //console.log(type);
    this.service.AddUpdateUser(this.userForm.value,type).subscribe(data=>{
      this.userForm.reset();
      this.GetAllUsers();
      //console.log(data);
    })
  }
  GetAllUsers(){
    this.service.GetAllUsers().subscribe(data=>{
      //console.log('users',data);
      this.users = data;
    })
  }

  DeleteUserByID(ID:any){
    this.service.DeleteUserByID(ID).subscribe(data=>{
      alert("User Deleted");
      this.GetAllUsers();
    })
  }
  GetUserByID(ID:any){
    this.service.GetUserByID(ID).subscribe(data=>{
      //alert("get User Successfully");
      //console.log("user detail",data);
        $("#home").addClass('show');
        $("#home").addClass('active');
        $("#profile").removeClass('show')
        $("#profile").removeClass('active')
      this.userForm.patchValue({
        Name:data.Name,
        Email:data.Email,
        Mobile:data.Mobile,
        Age:data.Age
      })
    })
    this.service.DeleteUserByID(ID).subscribe(data=>{
      //alert("User Deleted");
      this.GetAllUsers();
    })
  }
}
