import { Component } from '@angular/core';
import { Constants } from '../../../utils/Constants';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  showModal = false;
  activeOption: string | null = null;
  currentEntityType: string = Constants.EMPTY;
}
