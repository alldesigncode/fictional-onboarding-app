import { Component, OnInit } from '@angular/core';
import { ANIMATE_ELEM } from '../../utils/animationHelper';

@Component({
  selector: 'nb-choose-company',
  templateUrl: './choose-company.component.html',
  styleUrls: ['./choose-company.component.scss']
})
export class ChooseCompanyComponent implements OnInit {
  elem = ANIMATE_ELEM;
  constructor() { }

  ngOnInit(): void {
  }

}
