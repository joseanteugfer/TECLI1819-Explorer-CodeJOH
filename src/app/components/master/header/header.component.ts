import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  currentActor: boolean;
  activeRole: string = 'anonymous';

  constructor(private translateService: TranslateService,
    private authService: AuthService,
    private router: Router) {
    super(translateService);

  }



  ngOnInit() {
    this.authService.loggedIn.subscribe((authenticated) => {
      if (authenticated) {
        this.currentActor = true;
        this.activeRole = localStorage.getItem('activeRole');
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = false;
      }
      console.log(this.activeRole);
      console.log(this.currentActor)
    });
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('actor', '');
    localStorage.setItem('activeRole', 'anonymous');
    this.activeRole = 'anonymous';
    this.currentActor = false;

    this.router.navigate(['login']);
  }

}
