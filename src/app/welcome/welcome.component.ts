import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {SharedService } from '../shared.service'
import { Users } from '../users';
import {FormGroup, FormBuilder} from "@angular/forms"
import { EmployeeModal } from './welcome.modal';
import { ApiService } from '../shared/api.service';
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  sideNavStatus: boolean = false;

  name:string = "";
  isAdmin:boolean = false;
  empno:any;
  empname:any;
  age:any;
  salary:any;
  role:any;
  city:any;
  users:Users[] = [];

  formValue: any = FormGroup;
  empMobj : EmployeeModal = new EmployeeModal();
  employeeData !: any;
  // showAdd !: Boolean;
  // showUpdate !: Boolean;

  constructor(private shared:SharedService, public rs:RestService, private formbuilder: FormBuilder, private api : ApiService, private snackBar: MatSnackBar) {
   }

  ngOnInit(): void {
    this.name = this.shared.uname
    if(this.shared.admin == 1)
      this.isAdmin = true;
    
    this.rs.getUsers().subscribe((response)=>{
      this.users = response;
    })

    this.formValue = this.formbuilder.group({
      empno : [''],
      empname : [''],
      age : [''],
      role: [''],
      salary : [''],
      city : [''],
      pincode : [''],
      managerId : ['']
    })

    this.getAllEmployee();
  }

  Search(){
    if(this.empno == ""){
      this.ngOnInit();
    }else{
      this.employeeData = this.employeeData.filter(res =>{
      return res.empno.toLocaleLowerCase().match(this.empno.toLocaleLowerCase());
      })
    }
  }

  Search2(){
    if(this.empname == ""){
      this.ngOnInit();
    }else{
      this.employeeData = this.employeeData.filter(res =>{
        return res.empname.toLocaleLowerCase().match(this.empname.toLocaleLowerCase());
      })
    }
  }

  Search3(){
    if(this.age == ""){
      this.ngOnInit();
    }else{
      this.employeeData = this.employeeData.filter(res =>{
        return res.age.toLocaleLowerCase().match(this.age.toLocaleLowerCase());
      })
    }
  }

  Search4(){
    if(this.salary == ""){
      this.ngOnInit();
    }else{
      this.employeeData = this.employeeData.filter(res =>{
        return res.salary.toLocaleLowerCase().match(this.salary.toLocaleLowerCase());
      })
    }
  }

  Search5(){
    if(this.role == ""){
      this.ngOnInit();
    }else{
      this.employeeData = this.employeeData.filter(res =>{
        return res.role.toLocaleLowerCase().match(this.role.toLocaleLowerCase());
      })
    }
  }

  Search6(){
    if(this.city == ""){
      this.ngOnInit();
    }else{
      this.employeeData = this.employeeData.filter(res =>{
        return res.city.toLocaleLowerCase().match(this.city.toLocaleLowerCase());
      })
    }
  }


  

  key:string = 'id';
  reverse:boolean = false;

  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  // clickAddEmployee(){
  //   this.formValue.reset();
  //   this.showAdd = true;
  //   this.showUpdate = false;
  // }

  postEmpDetails(){
    this.empMobj.empno = this.formValue.value.empno;
    this.empMobj.empname = this.formValue.value.empname;
    this.empMobj.age = this.formValue.value.age;
    this.empMobj.salary = this.formValue.value.salary;
    this.empMobj.role = this.formValue.value.role;
    this.empMobj.city = this.formValue.value.city;
    this.empMobj.pincode = this.formValue.value.pincode;
    this.empMobj.managerId = this.formValue.value.managerId;

    this.api.postEmployee(this.empMobj).subscribe(res=>{
      console.log(res);
      //alert("Employee Added Sucessfully!");
      this.addSnackBar();

      // Cancel button
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },err=>{
      // alert("Something went wrong")
      this.errorSnackBar();
    })
    
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
    this.employeeData =  res;

    // console.log(this.employeeData instanceof(Object) )
    // console.log(this.employeeData)
    })
  }

  deleteEmployee(e: any){
    this.api.deleteEmployee(e.id).subscribe(res=>{
      // alert("Employee Deleted");
      this.deleteSnackBar();
      this.getAllEmployee();
    })
  }

  onEdit(e:any){
    // this.showAdd = false;
    // this.showUpdate = true;

    this.empMobj.id = e.id;

    this.formValue.controls['empno'].setValue(e.empno);
    this.formValue.controls['empname'].setValue(e.empname);
    this.formValue.controls['age'].setValue(e.age);
    this.formValue.controls['salary'].setValue(e.salary);
    this.formValue.controls['role'].setValue(e.role);
    this.formValue.controls['city'].setValue(e.city);
    this.formValue.controls['pincode'].setValue(e.pincode);
    this.formValue.controls['managerId'].setValue(e.managerId);
  }

  updateEmpDetails(){
    this.empMobj.empno = this.formValue.value.empno;
    this.empMobj.empname = this.formValue.value.empname;
    this.empMobj.age = this.formValue.value.age;
    this.empMobj.salary = this.formValue.value.salary;
    this.empMobj.role = this.formValue.value.role;
    this.empMobj.city = this.formValue.value.city;
    this.empMobj.pincode = this.formValue.value.pincode;
    this.empMobj.managerId = this.formValue.value.managerId;

    this.api.updateEmployee(this.empMobj,this.empMobj.id).subscribe(res=>{
      //alert("Updated Sucessfully!");
      this.editSnackBar();
      
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },err=>{
      console.log(err);
     // alert("Something went wrong");
     this.errorSnackBar();
    })
  }

  addSnackBar(){
    this.snackBar.open('Employee Added Successfully','x',{duration:3000})
  }
  editSnackBar(){
    this.snackBar.open('Employee Updated Successfully!','x',{duration:3000})
  }
  deleteSnackBar(){
    this.snackBar.open('Employee Deleted Successfully!','x',{duration:3000})
  }
  errorSnackBar(){
    this.snackBar.open('Something went wrong!','x',{duration:3000})
  }
}
