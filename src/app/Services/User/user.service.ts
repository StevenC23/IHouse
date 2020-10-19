import { DeviceService } from './../Device/device.service';
import { Injectable } from '@angular/core';
import { User } from '../../Model/user';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from 'src/app/Model/device';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  devicePro: Device;
  deviceProUid: string;
  listDeviceProv: Device[];
  userPro: User;
  private sub: Subscription;

  constructor(
    private db: AngularFirestore,
    private deviceService: DeviceService
  ) {}

  // tslint:disable-next-line: typedef
  insertUser(user: User): void {
    this.db
      .collection('users')
      .add(user)
      .catch((err) => console.log(err));
  }

  insertDeviceUser(uid: string, device: string, iplocal: string): void {
    this.deviceService.findDeviceById(device).subscribe((d) => {
      this.devicePro = d[0];
      if (d[0]) {
        this.devicePro.iplocal = iplocal;
        this.db
          .collection('users')
          .doc(uid)
          .get()
          .subscribe((r) => {
            if (r.data().devices) {
              this.listDeviceProv = r.data().devices;
            } else {
              this.listDeviceProv = [];
            }
            this.listDeviceProv.push(this.devicePro);
            console.table(this.listDeviceProv);

            this.db
              .collection('users')
              .doc(uid)
              .update({
                devices: this.listDeviceProv,
              })
              .then(() => {
                console.log('Correcto');
                console.log('borro documento');
                this.deviceService.deleteDevice(d[0].id);
              })
              .catch((e) => console.log('error', e));
          });
      } else {
        console.log('No hay data');
      }
    });
  }

  findUsers(): Observable<User[]> {
    return this.db
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as User;
            data.uid = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  findUserByEmail(email: string): Observable<any> {
    return this.db
      .collection('users', (ref) => ref.where('email', '==', email))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data() as User;
            return data;
          });
        })
      );
  }

  //
  // ***********************************************************
  // ***********************************************************
  // ***********************************************************
  //

  async getDevicesById(id: string): Promise<Device> {
    let div: Device;
    const device = await firebase
      .firestore()
      .collection('devices')
      .where('id', '==', id)
      .get();
    div = device.docs[0].data() as Device;
    return div;
  }
}
