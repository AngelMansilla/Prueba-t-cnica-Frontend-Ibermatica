import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Componentes compartidos
import { AddressFormComponent } from './components/address-form/address-form.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddressFormComponent,
    TabsComponent,
    TabComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
