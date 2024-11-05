import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() title: string | undefined;
  @Input() firstInfo: string | undefined;
  @Input() description: string | undefined;
  @Input() optionPosition: string = 'center';
}
