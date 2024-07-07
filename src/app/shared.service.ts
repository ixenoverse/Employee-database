import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  admin:number = 0;
  uname!: string;
  constructor() { }


}
