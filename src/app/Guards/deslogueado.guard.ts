import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeslogueadoGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      localStorage.getItem('rol') === 'ADMIN' ||
      localStorage.getItem('rol') === 'USER'
    ) {
      if (localStorage.getItem('rol') === 'ADMIN') {
        this.router.navigate(['./admin']);
        return false;
      } else {
        this.router.navigate(['./home']);
        return false;
      }
    } else {
      return true;
    }
  }
}
