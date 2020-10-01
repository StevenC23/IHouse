import { Device } from './device';

export class User {
  uid: string;
  email: string;
  name: string;
  pss: string;
  rol: string;
  devices: Device[];
}
