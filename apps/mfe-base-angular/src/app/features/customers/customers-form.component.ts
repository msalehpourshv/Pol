import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from './customers.service';

@Component({
  selector: 'pol-customers-form',
  template: `
    <div style="padding: 16px; display: flex; flex-direction: column; gap: 8px; width: 320px;">
      <h2>New Customer</h2>
      <label>
        Code
        <pol-input [(ngModel)]="code"></pol-input>
      </label>
      <label>
        Name
        <pol-input [(ngModel)]="name"></pol-input>
      </label>
      <label>
        <input type="checkbox" [(ngModel)]="isActive" /> Active
      </label>
      <pol-button (click)="save()">Save</pol-button>
    </div>
  `,
})
export class CustomersFormComponent {
  code = '';
  name = '';
  isActive = true;

  constructor(private service: CustomersService, private router: Router) {}

  async save() {
    await this.service.createCustomer({ code: this.code, name: this.name, isActive: this.isActive, id: '' } as any);
    this.router.navigate(['/app/base/customers']);
  }
}
