import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;

  list= [
    {
      number: '1',
      name: 'home',
      icon:'fa-solid fa-house',
    },
    {
      number: '2',
      name: 'Employee Managements',
      icon:'fa-solid fa-chart-line',
    },
    {
      number: '3',
      name: 'Settings',
      icon:'fa-solid fa-gear',
    },
    {
      number: '4',
      name: 'About',
      icon:'fa-solid fa-circle-info',
    },
    {
      number: '5',
      name: 'Contact',
      icon:'fa-solid fa-phone',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
