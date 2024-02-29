import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-atom-icon',
  templateUrl: './atom-icon.component.html',
  styleUrls: ['./atom-icon.component.css'],
})
export class IconComponent {
  constructor() {}

  @Input() name?: string;

  @Input() color = 'neutral-40';

  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  @Input() bradOpacity?: string;
  @Input() params?: CSSStyleSheet;
}
