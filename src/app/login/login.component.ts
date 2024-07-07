import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms"
import { Router } from '@angular/router';
import {SharedService } from '../shared.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private shared:SharedService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   email:[''],
    //   password:['']
    // })

    this.loginForm =  new FormGroup ({
      email: new FormControl(null,Validators.required),
      password: new FormControl(null,Validators.required)
    })
  }
  login(){
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res=>{
      const user = res.find((a:any)=>{
        if(a.email === this.loginForm.value.email && a.password === this.loginForm.value.password){
          this.shared.uname = a.fname;
          this.shared.admin = a.id
        }
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });
      if(user){
        // alert("Login Sucess");
        this.loginSnackBar();
        this.loginForm.reset();
        this.router.navigate(['welcome'])
      }else{
        alert("user not found");
      }
    },err=>{
      alert("Something went wrong!!");
    })
  }

  loginSnackBar(){
    this.snackBar.open('Login successful!','x',{duration:3000})
  }
}
