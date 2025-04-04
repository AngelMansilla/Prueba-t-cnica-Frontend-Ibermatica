import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Direccion } from '@core/models';

@Component({
  selector: 'app-address-form',
  template: `
    <div [formGroup]="addressForm" class="address-form">
      <div class="form-group">
        <label for="calle">Calle:</label>
        <input id="calle" type="text" formControlName="calle">
      </div>

      <div class="form-group">
        <label for="numero">Número:</label>
        <input id="numero" type="text" formControlName="numero">
      </div>

      <div class="form-group">
        <label for="puerta">Puerta:</label>
        <input id="puerta" type="text" formControlName="puerta">
      </div>

      <div class="form-group">
        <label for="codigoPostal">Código Postal:</label>
        <input id="codigoPostal" type="text" formControlName="codigoPostal">
      </div>

      <div class="form-group">
        <label for="ciudad">Ciudad:</label>
        <input id="ciudad" type="text" formControlName="ciudad">
      </div>
    </div>
  `,
  styles: [`
    .address-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1em;
    }
    .form-group {
      display: flex;
      flex-direction: column;
    }
    label {
      margin-bottom: 0.5em;
    }
    input {
      padding: 0.5em;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class AddressFormComponent {
  @Input() parentForm!: FormGroup;

  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      calle: [''],
      numero: [''],
      puerta: [''],
      codigoPostal: ['', [Validators.pattern(/^\d{5}$/)]],
      ciudad: ['']
    });
  }

  ngOnInit() {
    if (this.parentForm) {
      this.parentForm.addControl('direccion', this.addressForm);
    }
  }

  ngOnDestroy() {
    if (this.parentForm) {
      this.parentForm.removeControl('direccion');
    }
  }
}
