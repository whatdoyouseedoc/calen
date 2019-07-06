import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent implements OnInit {

  @Input() public daysList;
  
  constructor() { }

  ngOnInit() {
  }

}
