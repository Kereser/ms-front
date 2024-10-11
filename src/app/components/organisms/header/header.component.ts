import { Component, OnInit } from '@angular/core';
import { Consts } from '../../../utils/Constants';

@Component({
  selector: Consts.HEADER_SELECTOR,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
