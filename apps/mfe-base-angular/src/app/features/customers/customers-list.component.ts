import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from './customers.service';
import { Customer } from '@pol/contracts';

@Component({
  selector: 'pol-customers-list',
  template: `
    <div style="padding: 16px;">
      <h2>Customers</h2>
      <pol-button (click)="goToNew()">New Customer</pol-button>
      <table border="1" cellpadding="8" cellspacing="0" style="margin-top: 12px;">
        <thead>
          <tr>
            <th>ID</th>
            <th>Code</th>
            <th>Name</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of customers">
            <td>{{ c.id }}</td>
            <td>{{ c.code }}</td>
            <td>{{ c.name }}</td>
            <td>{{ c.isActive ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class CustomersListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private service: CustomersService, private router: Router) {}

  async ngOnInit() {
    this.customers = await this.service.getCustomers();
  }

  goToNew() {
    this.router.navigate(['/app/base/customers/new']);
  }
}
