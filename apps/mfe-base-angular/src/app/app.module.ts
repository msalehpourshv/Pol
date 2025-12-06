import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CustomersListComponent } from './features/customers/customers-list.component';
import { CustomersFormComponent } from './features/customers/customers-form.component';
import { PolUiModule } from '@pol/ui-angular';
import { AuthInterceptor } from '@pol/auth-angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomersListComponent, CustomersFormComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule, AppRoutingModule, PolUiModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [CustomersListComponent],
})
export class AppModule {}
