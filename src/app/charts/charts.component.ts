import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import {Chart, registerables} from 'node_modules/chart.js'
import { ApiService } from '../shared/api.service';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @ViewChild('canvasImg') canvasImg;

  sideNavStatus: boolean = false;
  chartdata: any;
  empdata:any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  ages: any[] = [];
  ages2: any[] = [];
  empRoles: any[] = [];
  empRoles2: any[] = [];

  age1: number 
  age2: number 
  age3: number

  num1: number 
  num2: number 
  num3: number
  num4: number
  
  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.Getchartinfo().subscribe(result=>{
      this.chartdata = result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          // console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].year);
          this.realdata.push(this.chartdata[i].amount);
          this.colordata.push(this.chartdata[i].colorcode);
        }
        this.RenderChart(this.labeldata,this.realdata,this.colordata,'pie','piechart');
      }
    });

    this.api.Getuserinfo().subscribe(res=>{
      this.empdata = res;

      if(this.empdata!=null){
       // let age1 = 0, age2= 0, age3 = 0;
       // let num1 = 0, num2 = 0, num3 = 0, num4 = 0;
       this.age1 = 0;
       this.age2 = 0;
       this.age3 = 0;

       this.num1 = 0;
       this.num2 = 0;
       this.num3 = 0;
       this.num4 = 0;
       

        for(let i=0;i<this.empdata.length;i++){
          if(Number(this.empdata[i].age) < 30)
            this.age1++;
          else if(Number(this.empdata[i].age) <= 40)
            this.age2++;
          else
            this.age3++;

          if(this.empdata[i].role === 'Manager')
            this.num1++;
          else if(this.empdata[i].role === 'Team Lead')
            this.num2++;
          else if(this.empdata[i].role === 'Senior Associate')
            this.num3++;
          else if(this.empdata[i].role === 'Junior Associate')
            this.num4++;
        }
        this.ages.push(this.age1);
        this.ages.push(this.age2);
        this.ages.push(this.age3);

        this.ages2.push([this.age1,0,0]);  
        this.ages2.push([0,this.age2,0]);
        this.ages2.push([0,0,this.age3]);

        this.empRoles.push(this.num1);
        this.empRoles.push(this.num2);
        this.empRoles.push(this.num3);
        this.empRoles.push(this.num4);

        this.empRoles2.push([this.num1,0,0,0]);  
        this.empRoles2.push([0,this.num2,0,0]);
        this.empRoles2.push([0,0,this.num3,0]);
        this.empRoles2.push([0,0,0,this.num4]);
      }

      this.RenderAgeChart(this.ages,'doughnut','agechart');
      this.RenderAgeChart2(this.ages2,'bar','agechart2');

      this.RenderRoleChart2(this.empRoles2,'bar','roleschart')
      this.RenderRoleChart(this.empRoles,'pie','roleschart2')
      this.RenderRoleChart(this.empRoles,'line','roleschart3')
      this.RenderRoleChart(this.empRoles,'polarArea','roleschart4')
      this.RenderRoleChart(this.empRoles,'radar','roleschart5')
    })

    this.RenderBubblechart();
  }

  downloadPDF(){
    var canvas  = document.getElementById('agechart') as HTMLCanvasElement;
    var canvasImage = canvas.toDataURL('image/jpeg',1.0)
    
    //image to pdf
    let pdf = new jsPDF('landscape'); 
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 70, 20, 150, 150);
    pdf.text("Employee Age Pie",120,12);
    pdf.text(`Employees <30 years: ${this.age1}\nEmployees 30 years - 40 years: ${this.age2}\nEmployees >40 years: ${this.age3}`,75,180);
    pdf.save('mychart.pdf');
  }

  downloadPDF2(){
    var canvas  = document.getElementById('agechart2') as HTMLCanvasElement;
    var canvasImage = canvas.toDataURL('image/jpeg',1.0)
    
    //image to pdf
    let pdf = new jsPDF('landscape'); 
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 70, 20, 150, 75);
    pdf.text("Employee Age Bar",120,10);
    pdf.text(`Employees <30 years: ${this.age1}\nEmployees 30 years - 40 years: ${this.age2}\nEmployees >40 years: ${this.age3}`,75,105);
    pdf.save('mychart.pdf');
  }

  downloadPDF_age(){
    // AGE pie
    var canvas  = document.getElementById('agechart') as HTMLCanvasElement;
    var canvasImage = canvas.toDataURL('image/jpeg',1.0)
    
    //image to pdf
    let pdf = new jsPDF('landscape'); 
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 30, 20, 85, 85);
    pdf.text("Employee Age Pie",40,10);

    // AGE bar
    var canvas2  = document.getElementById('agechart2') as HTMLCanvasElement;
    var canvasImage2 = canvas2.toDataURL('image/jpeg',1.0)
    
    //image to pdf
    pdf.setFontSize(20);
    pdf.addImage(canvasImage2, 'JPEG', 160, 20, 110, 55);
    pdf.text("Employee Age Bar",180,10);
    pdf.text(`Employees <30 years: ${this.age1},  Employees 30 years - 40 years: ${this.age2},   Employees >40 years: ${this.age3}`,15,130);
    pdf.save('mychart.pdf');

    
  }

  downloadPDF3(){
    var canvas  = document.getElementById('roleschart2') as HTMLCanvasElement;
    var canvasImage = canvas.toDataURL('image/jpeg',1.0)
    
    //image to pdf
    let pdf = new jsPDF('landscape'); 
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 70, 20, 150, 150);
    pdf.text("Employee Roles Pie",120,12);
    pdf.text(`Manager: ${this.num1}\nTeam Lead: ${this.num2}\nSenior Associate: ${this.num3}\nJunior Associate: ${this.num4}`,75,180);
    pdf.save('mychart.pdf');
  }

  downloadPDF4(){
    var canvas  = document.getElementById('roleschart') as HTMLCanvasElement;
    var canvasImage = canvas.toDataURL('image/jpeg',1.0)
    
    //image to pdf
    let pdf = new jsPDF('landscape'); 
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 70, 20, 150, 75);
    pdf.text("Employee Roles Bar",120,10);
    pdf.text(`Manager: ${this.num1}\nTeam Lead: ${this.num2}\nSenior Associate: ${this.num3}\nJunior Associate: ${this.num4}`,75,105);
    pdf.save('mychart.pdf');
  }

  downloadPDF_role(){
    // ROLE pie
    var canvas  = document.getElementById('roleschart2') as HTMLCanvasElement;
    var canvasImage = canvas.toDataURL('image/jpeg',1.0)
    
    //image to pdf
    let pdf = new jsPDF('landscape'); 
    pdf.setFontSize(20);
    pdf.addImage(canvasImage, 'JPEG', 30, 20, 85, 85);
    pdf.text("Employee Role Pie",40,10);

    // ROLE bar
    var canvas2  = document.getElementById('roleschart') as HTMLCanvasElement;
    var canvasImage2 = canvas2.toDataURL('image/jpeg',1.0)
    
    //image to pdf 
    pdf.setFontSize(20);
    pdf.addImage(canvasImage2, 'JPEG', 160, 20, 110, 55);
    pdf.text("Employee Role Bar",180,10);
    pdf.text(`Manager: ${this.num1},  Team Lead: ${this.num2},  Senior Associate: ${this.num3}, Junior Associate: ${this.num4}`,40,130);
    pdf.save('mychart.pdf');
  }

  RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any){
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)'
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

  RenderAgeChart(maindata:any,type:any,id:any){
    const bgColor = {
      id:'bgColor',
      beforeDraw: (chart,options) =>{
        const {ctx, width, height} = chart;
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height);
        ctx.restore();
      }
    };
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['<30years','30years-40years','>40years'],
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
      },
      plugins: [bgColor]
    });

  }

  RenderAgeChart2(maindata,type:any,id:any){
    const bgColor = {
      id:'bgColor',
      beforeDraw: (chart,options) =>{
        const {ctx, width, height} = chart;
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height);
        ctx.restore();
      }
    };
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['<30years','30years-40years','>40years'],
        datasets: [{
          label: '<30years',
          //data: [4,0,0],
           data: maindata[0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: '30years-40years',
          //data: [0,3,0],
           data: maindata[1],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: '>40years',
          //data: [0,0,6],
           data: maindata[2],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }
      ],
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: "#000080",
          }
        },
        scales: {
          x:{
            stacked: true
          },
          y: {
            beginAtZero: true
            
          }
        }
      },
      plugins: [bgColor]
    });

  }

  RenderRoleChart(maindata:any,type:any,id:any){
    const bgColor = {
      id:'bgColor',
      beforeDraw: (chart,options) =>{
        const {ctx, width, height} = chart;
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height);
        ctx.restore();
      }
    };
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
      },
      plugins: [bgColor]
    });

  }

  RenderRoleChart2(maindata,type:any,id:any){
    const bgColor = {
      id:'bgColor',
      beforeDraw: (chart,options) =>{
        const {ctx, width, height} = chart;
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,width,height);
        ctx.restore();
      }
    };
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: ['Manager','Team Lead','Senior Associate','Junior Associate'],
        datasets: [{
          label: 'Manager',
           data: maindata[0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Team Lead',
           data: maindata[1],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Senior Associate',
           data: maindata[2],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        },
        {
          label: 'Junior Associate',
           data: maindata[3],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ],
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: "#000080",
          }
        },
        scales: {
          x:{
            stacked: true
          },
          y: {
            beginAtZero: true
            
          }
        }
      },
      plugins: [bgColor]
    });

  }

  RenderBubblechart(){
    const data = {
      datasets: [{
        label: 'Dataset1',
        data: [{
          x: 20,
          y: 30,
          r: 15
        }, {
          x: 40,
          y: 10,
          r: 40
        }],
        backgroundColor: 'rgb(255, 99, 132,0.5)',
      },{
        label: 'Dataset2',
        data: [{
          x: 50,
          y: 20,
          r: 35
        }, {
          x: 25,
          y: 15,
          r: 27
        }],
        backgroundColor: 'rgb(255, 206, 86,0.5)',
      }

    ]
    };
    const myChart = new Chart('roleschart6', {
      type: 'bubble',
      data: data,
      options: {
        
      }
    });
  }
}
