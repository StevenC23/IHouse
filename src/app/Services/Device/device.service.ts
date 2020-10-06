import { observable, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Device } from 'src/app/Model/device';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  d: Device;
  constructor(private db: AngularFirestore, private httClient: HttpClient) {}

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
            data.uid = a.payload.doc.id;
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
    this.findDeviceByIdd(id).subscribe((d) => {
      if (d[0]) {
        this.db.doc(`devices/${d[0].uid}`).delete();
      }
    });
  }

  changeStateDevice(id: string): Observable<any> {
    return this.httClient.get(`http://${id}`);
  }
}
