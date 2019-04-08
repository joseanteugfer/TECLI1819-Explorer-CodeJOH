import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  extends TranslatableComponent implements OnInit {

  constructor(private translatableService: TranslateService,) {
    super(translatableService);
   }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('token', '');
  }

}
