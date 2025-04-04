import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  template: `
    <div [class.hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .hidden {
      display: none;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class TabComponent {
  @Input() title: string = '';
  active = false;
}
