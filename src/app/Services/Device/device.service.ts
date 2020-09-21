import { observable, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/Model/device';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private db: AngularFirestore) {}

  insertDevice(device: Device): void {
    this.db
      .collection('devices')
      .add(device)
      .catch((err) => console.log(err));
  }

  findDevices(): Observable<Device[]> {
    return this.db
      .collection('devices')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Device;
            return data;
          });
        })
      );
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

  deleteDevice(id: string): void {
    if (this.findDeviceById(id)) {
      console.log(this.findDeviceById(id));
      console.log('existe');
    } else {
      console.log('no existe');
    }
  }
}