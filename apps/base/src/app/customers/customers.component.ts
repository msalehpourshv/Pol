import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerDto } from '@pol/contracts';
import { CustomersApi, HttpClient } from '@pol/service-proxy';
// import { environment } from '../environments/environment';

@Component({
  selector: 'app-customers',
  template: `
    <h1>مشتری‌ها</h1>
    <!-- <app-button variant="primary">مشتری جدید</app-button> -->

    <ul>
      <li *ngFor="let c of customers">
        {{ c.fullName }} - {{ c.mobile }}
      </li>
    </ul>
  `,
  imports: [NgFor],
})
export class CustomersComponent implements OnInit {
  customers: CustomerDto[] = [];
  apiBaseUrl = 'http://localhost:3000'; // Replace with environment.apiBaseUrl when available

  private api = new CustomersApi(
    // new HttpClient(environment.apiBaseUrl, () => localStorage.getItem('token')),
    new HttpClient(this.apiBaseUrl, () => localStorage.getItem('token')),
  );

  ngOnInit(): void {
    this.api.getAll().then(c => (this.customers = c));
  }
}