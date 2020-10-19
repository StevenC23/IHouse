import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/Model/device';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  subDevice: Subscription;
  subop: Subscription;
  d: Device;
  constructor(private db: AngularFirestore, private httClient: HttpClient) {}

  insertDevice(device: Device): void {
    this.db
      .collection('devices')
      .add(device)
      .catch((err) => console.log(err));
  }

  findDeviceById(id: string): Observable<any> {
    return this.db
      .collection('devices', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data() as Device;
            return data;
          });
        })
      );
  }

  findDeviceByIdd(id: string): Observable<any> {
    return this.db
      .collection('devices', (ref) => ref.where('id', '==', id))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data() as Device;
            data.uid = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  deleteDevice(id: string): void {
    this.subDevice = this.findDeviceByIdd(id).subscribe(
      (d) => {
        if (d[0]) {
          this.db.doc(`devices/${d[0].uid}`).delete();
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        this.subDevice.unsubscribe();
      }
    );
  }

  changeStateDevice(id: string): Observable<any> {
    return this.httClient.get(`http://${id}`, { responseType: 'text' });
  }

  //
  // ***********************************************************
  // ***********************************************************
  // ***********************************************************
  //
  findDevices(): Observable<Device[]> {
    return this.db
      .collection('devices')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Device;
            data.uid = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  getDevicesByUser(email: string): Observable<any> {
    return this.db
      .collection('devices', (ref) => ref.where('user', '==', email))
      .snapshotChanges()
      .pipe(
        map((action) => {
          return action.map((a) => {
            const data = a.payload.doc.data() as Device;
            return data;
          });
        })
      );
  }

  async getDevicesById(id: string): Promise<Device> {
    let div: Device;
    const device = await firebase
      .firestore()
      .collection('devices')
      .where('id', '==', id)
      .get();
    div = device.docs[0].data() as Device;
    div.uid = device.docs[0].id;
    return div;
  }

  findDevicesNotAssign(): Observable<Device[]> {
    return this.db
      .collection('devices', (ref) => ref.where('user', '==', 'Not Assign'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Device;
            data.uid = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  // tslint:disable-next-line: typedef
  assignDeviceUser(email: string, device: string, ip: string) {
    const deviceById = this.getDevicesById(device);
    deviceById.then((d) => {
      this.db.collection('devices').doc(d.uid).update({
        iplocal: ip,
        user: email,
      });
    });
  }

  // tslint:disable-next-line: typedef
  deleteDeviceUser(id: string) {
    const deviceById = this.getDevicesById(id);
    deviceById.then((d) => {
      this.db.collection('devices').doc(d.uid).update({
        iplocal: 'Not Assign',
        user: 'Not Assign',
      });
    });
  }
}
