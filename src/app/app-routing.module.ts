import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { HomeComponent } from './Pgs/home/home.component';
import { LoginPgComponent } from './Pgs/login-pg/login-pg.component';
import { RegisterPgComponent } from './Pgs/register-pg/register-pg.component';
import { PageNotFoundComponent } from './Pgs/page-not-found/page-not-found.component';
// components
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [],
  },
  {
    path: 'login',
    component: LoginPgComponent,
  },
  {
    path: 'register',
    component: RegisterPgComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
