import { Device } from './device';

export class User {
  email: string;
  name: string;
  pss: string;
  rol: string;
  devices: Device[];
}
