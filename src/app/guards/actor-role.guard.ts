import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { reject } from 'q';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActorRoleGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): Observable <boolean> | Promise <boolean> | boolean {
      return new Promise ((resolve, reject) => {
        const expectedRole = next.data.expectedRole;
        const currentActor = this.authService.getCurrentActor();
        let result = false;
        console.log(currentActor);
        if (currentActor) {
          //es necesario usar role[0], porque en el backend está modelado ese campo como un array
          const activeRole = localStorage.getItem('activeRole');
          if (expectedRole.search(activeRole) !== -1) {
            result = true;
          } else {
            this.router.navigate(['denied-access'], {queryParams: {previousURL: state.url}});
          }
          resolve(result);
        } else {
          console.log(expectedRole);
          if (expectedRole.indexOf('anonymous') !== -1) {
            result = true;
          } else {
            this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
          }
          resolve(result);
        }
      });
    }
}
