import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service'
import {Chart, registerables} from 'node_modules/chart.js'
import { MatSnackBar } from '@angular/material/snack-bar'

Chart.register(...registerables);

@Component({
  selector: 'app-chart-operations',
  templateUrl: './chart-operations.component.html',
  styleUrls: ['./chart-operations.component.css']
})
export class ChartOperationsComponent implements OnInit {

  sideNavStatus: boolean = false; 

  chartdata: any;
  empdata:any;
  empdata2:any;
  k:number = 0;

  ages: any[] = [];
  empRoles: any[] = [];
  empRoles2: any[] = [];

  public mid:number;

  constructor(private api : ApiService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {

    console.log("hahaha");
    

    this.api.Getuserinfo().subscribe(res=>{
      this.empdata = res;

      if(this.empdata!=null){
        let age1 = 0, age2= 0, age3 = 0;
        let num1 = 0, num2 = 0, num3 = 0, num4 = 0;
       

        for(let i=0;i<this.empdata.length;i++){
          if(Number(this.empdata[i].age) < 40)
            age1++;
          else if(Number(this.empdata[i].age) <= 60)
            age2++;
          else
            age3++;

          if(this.empdata[i].role === 'Manager')
            num1++;
          else if(this.empdata[i].role === 'Team Lead')
            num2++;
          else if(this.empdata[i].role === 'Senior Associate')
            num3++;
          else if(this.empdata[i].role === 'Junior Associate')
            num4++;
        }
        this.ages.push(age1);
        this.ages.push(age2);
        this.ages.push(age3);

        this.empRoles.push(num1);
        this.empRoles.push(num2);
        this.empRoles.push(num3);
        this.empRoles.push(num4);
      }

      console.log(this.empRoles);
      this.RenderRoleChart(this.empRoles,'pie','roleschart3');
    })
  }

  RenderAgeChart(maindata:any,type:any,id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['<40years','40years-60years','>60years'],
        datasets: [{
          label: '# of Employees',
          data: maindata,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

  RenderRoleChart(maindata:any,type:any,id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['Manager','Team Lead','Senior Associate','Junior Associate'],
        datasets: [{
          label: '# of Employees',
          data: maindata,
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

  RenderRoleChart2(maindata:any,type:any,id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['Team Lead','Senior Associate','Junior Associate'],
        datasets: [{
          label: '# of Employees',
          data: maindata,
          backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

  search(){
    console.log(this.mid);

    var chartExist = Chart.getChart("roleschart3"); // <canvas> id
    
    if (chartExist != undefined)  
      chartExist.destroy();
  


    this.api.Getuserinfo().subscribe(res=>{
      this.empdata = res;

      if(this.empdata!=null){
        let num1 = 0, num2 = 0, num3 = 0;
       
        
        for(let i=0;i<this.empdata.length;i++){
  
          if(this.empdata[i].managerId == this.mid && Number(this.empdata[i].empno) != this.mid){
            // if(this.empdata[i].role === 'Manager')
            // num1++,this.k++;
          if(this.empdata[i].role === 'Team Lead')
            num1++,this.k++;
          else if(this.empdata[i].role === 'Senior Associate')
            num2++,this.k++;
          else if(this.empdata[i].role === 'Junior Associate')
            num3++,this.k++;
          }
        }

        this.empRoles2 = [];
  
        this.empRoles2.push(num1);
        this.empRoles2.push(num2);
        this.empRoles2.push(num3);
       // this.empRoles2.push(num4);
      }
      
      console.log(this.empRoles2)
      console.log(this.k);
      
      if(this.k === 0)
        this.emptySnackBar()

      this.RenderRoleChart2(this.empRoles2,'pie','roleschart3')
      this.k = 0;
    })
  }

  emptySnackBar(){
    this.snackBar.open('Manger not found!','x',{duration:3000})
  }
}
