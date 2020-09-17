import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { HomeComponent } from './Pgs/home/home.component';
import { LoginPgComponent } from './Pgs/login-pg/login-pg.component';
import { RegisterPgComponent } from './Pgs/register-pg/register-pg.component';
import { PageNotFoundComponent } from './Pgs/page-not-found/page-not-found.component';
import { StartComponent } from './Pgs/start/start.component';
import { RecommendationsComponent } from './Pgs/recommendations/recommendations.component';
import { AdminComponent } from './Pgs/admin/admin.component';

// Components
import { UserListComponent } from './Components/user-list/user-list.component';

// Guards
import { AdminGuard } from './Guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  },
  {
    path: 'recommendations',
    component: RecommendationsComponent,
  },
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
    path: 'admin',
    canActivate: [AdminGuard],
    component: AdminComponent,
    children: [
      {
        path: 'user-list',
        component: UserListComponent,
      },
    ],
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
