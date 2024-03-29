import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { environment } from '../environments/environment';

import { HomeComponent } from './Pgs/home/home.component';
import { LoginPgComponent } from './Pgs/login-pg/login-pg.component';
import { RegisterPgComponent } from './Pgs/register-pg/register-pg.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PageNotFoundComponent } from './Pgs/page-not-found/page-not-found.component';
import { StartComponent } from './Pgs/start/start.component';
import { RecommendationsComponent } from './Pgs/recommendations/recommendations.component';
import { AdminComponent } from './Pgs/admin/admin.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { DevicesStockComponent } from './Components/devices-stock/devices-stock.component';
import { DevicesListComponent } from './Components/devices-list/devices-list.component';
import { DevicesAggComponent } from './Components/devices-agg/devices-agg.component';
import { UserDevicesListComponent } from './Components/user-devices-list/user-devices-list.component';
import { DevicesAssignComponent } from './Components/devices-assign/devices-assign.component';

import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { PruebaMqttComponent } from './Components/prueba-mqtt/prueba-mqtt.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname:'18.221.196.39',
  // hostname: 'ec2-3-16-75-9.us-east-2.compute.amazonaws.com',
  // hostname: '172.31.11.52',
  port: 9001,
  path: '/mqtt',
  protocol: 'ws'
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    LoginPgComponent,
    RegisterPgComponent,
    FooterComponent,
    PageNotFoundComponent,
    StartComponent,
    RecommendationsComponent,
    AdminComponent,
    UserListComponent,
    DevicesStockComponent,
    DevicesListComponent,
    DevicesAggComponent,
    UserDevicesListComponent,
    DevicesAssignComponent,
    PruebaMqttComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NoopAnimationsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
