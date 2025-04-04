import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  template: `
    <div [class.active]="active" class="tab-pane">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tab-pane {
      display: none;
    }
    .tab-pane.active {
      display: block;
    }
  `]
})
export class TabComponent {
  @Input() title!: string;
  @Input() active = false;
}
