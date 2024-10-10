import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../utils/Constants';

@Component({
  selector: Constants.HEADER_SELECTOR,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
