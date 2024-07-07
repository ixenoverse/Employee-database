import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {SharedService } from '../shared.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  name:string = "";
  isAdmin:boolean = false;

  constructor(private shared:SharedService) { }

  ngOnInit(): void {
    this.name = this.shared.uname
    if(this.shared.admin == 1)
      this.isAdmin = true;
  }

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

}
