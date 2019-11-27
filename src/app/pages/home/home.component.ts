import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  category: boolean = true
  department: boolean = false
  constructor() { }

  ngOnInit() {

  }



  console() {
    console.log('hello')
    this.category = !this.category
    this.department = !this.department
  }
}
