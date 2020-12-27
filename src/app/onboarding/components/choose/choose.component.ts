import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nb-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.scss']
})
export class ChooseComponent implements OnInit {

  @Input() select = {} as any;

  constructor() { }

  ngOnInit(): void {
  }

}
