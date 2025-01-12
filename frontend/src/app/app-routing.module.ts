import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { PolicyComponent } from './policy/policy.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './form-product/form-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/categories/:category', component: ProductsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: PolicyComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products/product/:id', component: SingleProductComponent },
  { path : 'dashboard', component: DashboardComponent},
  { path : 'dashboard/products/addproduct', component: AddProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
