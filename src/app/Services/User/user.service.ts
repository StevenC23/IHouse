import { DeviceService } from './../Device/device.service';
import { Injectable } from '@angular/core';
import { User } from '../../Model/user';

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Device } from 'src/app/Model/device';

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
  //
  //
  deleteDeviceByUser(email: string, uidU: string, idD: string): void {
    let devicesArr: Device[];
    let deviceDelete: Device;
    let userPro: User;
    let ind: number;
    console.log('----------------------------------------------------');
    this.sub = this.findUserByEmail(email).subscribe((d) => {
      console.log('*******************************************************');
      userPro = d[0];
      devicesArr = userPro.devices;

      ind = 0;
      console.log(ind);

      if (devicesArr[ind] !== undefined) {
        while (idD !== devicesArr[ind].id) {
          ind = ind + 1;
          console.log(ind);
        }

        if (idD === devicesArr[ind].id) {
          deviceDelete = devicesArr[ind];
          console.log(deviceDelete);
          devicesArr.splice(ind, 1);
          console.log(devicesArr);

          if (devicesArr === undefined) {
            devicesArr = [];
          }
          this.db
            .collection('users')
            .doc(uidU)
            .update({
              devices: devicesArr,
            })
            .then(() => {
              console.log('/////////////////////////////////////////');
              console.log('eliminó device');
              deviceDelete.iplocal = 'Not Assign';
              deviceDelete.state = 'false';
              this.deviceService.insertDevice(deviceDelete);
              console.log('agrega device a la lista de devices');
            })
            .catch((e) => console.log('error', e));
        }
      }
    });
  }
}
