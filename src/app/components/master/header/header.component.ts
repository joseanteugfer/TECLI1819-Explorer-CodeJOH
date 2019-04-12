import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  extends TranslatableComponent implements OnInit {

  constructor(private translatableService: TranslateService,
              private authService: AuthService, 
              private router: Router) {
    super(translatableService);
   }

  ngOnInit() {
  }

  isUserAuthenticated(){
    return this.authService.isUserAuthenticated();
  }

  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['login']);
  }

}
