import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() headingMain: string;
  @Input() headingSecondary: string;

  constructor() { }

  ngOnInit(): void {
  }

}
