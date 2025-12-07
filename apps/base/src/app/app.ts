import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { CustomersComponent } from './customers/customers.component';

@Component({
  imports: [NxWelcome, RouterModule, CustomersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'base';
}
