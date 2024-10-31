import { Component } from '@angular/core';
import { Consts } from '../../../utils/Constants';
import { UserService } from '@app/shared/services/user/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  showModal = false;
  activeOption: string | null = null;
  currentEntityType: string = Consts.EMPTY;

  constructor(public userService: UserService) {}
}
