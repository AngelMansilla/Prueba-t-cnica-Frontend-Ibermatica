import { Component, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <div class="tabs-header">
        <button
          *ngFor="let tab of tabs"
          type="button"
          class="tab-button"
          [class.active]="tab.active"
          (click)="selectTab(tab, $event)">
          {{ tab.title }}
        </button>
      </div>
      <div class="tabs-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .tabs {
      margin: 1rem 0;
    }
    .tabs-header {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #ddd;
    }
    .tab-button {
      padding: 0.5rem 1rem;
      border: none;
      background: none;
      cursor: pointer;
      font-size: 1rem;
      color: #666;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      transition: all 0.2s ease;
    }
    .tab-button:hover {
      color: #1976d2;
    }
    .tab-button.active {
      color: #1976d2;
      border-bottom-color: #1976d2;
    }
    .tabs-content {
      padding: 1rem 0;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter(tab => tab.active);
    if (activeTabs.length === 0 && this.tabs.first) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent, event?: MouseEvent) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.tabs.forEach(tab => tab.active = false);
    tab.active = true;
  }
}
