import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <div class="tab-headers">
        <button
          *ngFor="let tab of tabs"
          [class.active]="tab.active"
          (click)="selectTab(tab)">
          {{tab.title}}
        </button>
      </div>
      <div class="tab-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .tabs {
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    .tab-headers {
      display: flex;
      background: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }
    button {
      padding: 1em 2em;
      border: none;
      background: none;
      cursor: pointer;
    }
    button.active {
      background: white;
      border-bottom: 2px solid #007bff;
    }
    .tab-content {
      padding: 1em;
    }
  `]
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    // Activar la primera pestaña por defecto
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0 && this.tabs.first) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(selectedTab: TabComponent) {
    this.tabs.forEach(tab => tab.active = false);
    selectedTab.active = true;
  }
}
