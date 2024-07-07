import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {MustMatch} from './_helpers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
    // this.signupForm = this.formBuilder.group({
    //   fname:['',Validators.required],
    //   lname:['',Validators.required],
    //   email:['',Validators.required,Validators.email],
    //   password:['',[Validators.required,Validators.minLength(8)]],
    //   password2:['',Validators.required]
    // });

    this.signupForm = new FormGroup({
      fname: new FormControl(null,Validators.required),
      lname: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required),
      password2: new FormControl(null,Validators.required)
    });
  }


  // signUp(){
  //   console.log(this.signupForm);
  //   this.http.post<any>("http://localhost:3000/signupUsers",this.signupForm.value).subscribe(res=>{
  //     alert("Signup Sucessfull");
  //     this.signupForm.reset();
  //     this.router.navigate(['login']);
  // },err=>{
  //     alert("Something went wrong!")
  //   })
  // }

  signUp(){
    console.log(this.signupForm);
  }
}
