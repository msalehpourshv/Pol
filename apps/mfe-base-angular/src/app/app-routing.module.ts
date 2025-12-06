import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './features/customers/customers-list.component';
import { CustomersFormComponent } from './features/customers/customers-form.component';
import { AuthGuard } from '@pol/auth-angular';

const routes: Routes = [
  {
    path: 'app/base/customers',
    component: CustomersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/base/customers/new',
    component: CustomersFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app/base/customers/:id',
    component: CustomersFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
