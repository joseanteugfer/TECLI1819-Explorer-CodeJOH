import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  canActivate(next: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable <boolean> | Promise <boolean> | boolean {
      return true;
    }
}
