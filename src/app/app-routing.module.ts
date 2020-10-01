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
import { DevicesStockComponent } from './Components/devices-stock/devices-stock.component';
import { DevicesListComponent } from './Components/devices-list/devices-list.component';
import { DevicesAggComponent } from './Components/devices-agg/devices-agg.component';
import { DevicesAssignComponent } from './Components/devices-assign/devices-assign.component';
// Guards
import { AdminGuard } from './Guards/admin.guard';
import { LogueadoGuard } from './Guards/logueado.guard';
import { DeslogueadoGuard } from './Guards/deslogueado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [DeslogueadoGuard],
    component: StartComponent,
  },
  {
    path: 'recommendations',
    canActivate: [DeslogueadoGuard],
    component: RecommendationsComponent,
  },
  {
    path: 'login',
    canActivate: [DeslogueadoGuard],
    component: LoginPgComponent,
  },
  {
    path: 'register',
    canActivate: [DeslogueadoGuard],
    component: RegisterPgComponent,
  },
  {
    path: 'home',
    canActivate: [LogueadoGuard],
    component: HomeComponent,
    children: [],
  },
  {
    path: 'admin',
    canActivate: [LogueadoGuard, AdminGuard],
    component: AdminComponent,
    children: [
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'devices-stock',
        component: DevicesStockComponent,
        children: [
          {
            path: 'devices-list',
            component: DevicesListComponent,
          },
          {
            path: 'devices-agg',
            component: DevicesAggComponent,
          },
          {
            path: 'devices-assign',
            component: DevicesAssignComponent,
          },
        ],
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
