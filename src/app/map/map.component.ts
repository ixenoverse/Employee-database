import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service'
import {Chart, registerables} from 'node_modules/chart.js'
// import {ChartGeo} from 'chartjs-chart-geo';
import * as ChartGeo from 'chartjs-chart-geo' 
import { MatSnackBar } from '@angular/material/snack-bar'
import { GeometryCollection } from 'geojson';

Chart.register(...registerables);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  sideNavStatus: boolean = false;
  url = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

  chartdata: any;
  empdata:any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

  ages: any[] = [];


  age1: number 
  age2: number 
  age3: number


  constructor(private api : ApiService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.api.Getuserinfo().subscribe(res=>{
      this.empdata = res;

      if(this.empdata!=null){
       // let age1 = 0, age2= 0, age3 = 0;
       // let num1 = 0, num2 = 0, num3 = 0, num4 = 0;
       this.age1 = 0;
       this.age2 = 0;
       this.age3 = 0;

        for(let i=0;i<this.empdata.length;i++){
          if(Number(this.empdata[i].age) < 30)
            this.age1++;
          else if(Number(this.empdata[i].age) <= 40)
            this.age2++;
          else
            this.age3++;
        }
        this.ages.push(this.age1);
        this.ages.push(this.age2);
        this.ages.push(this.age3);

      }

      this.RenderAgeChart(this.ages,'doughnut','agechart');
    })

    // fetch(this.url).then((result) => result.json()).then((datapoint) => {
    //   const countries  = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;
    // })

    
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

  // getMap(){
  //   fetch(this.url).then((result) => result.json()).then((datapoint) => {
  //     const countries = ChartGeo.topojson.feature(datapoint, datapoint.objects.countries).features;
  //   })
  // }
}
