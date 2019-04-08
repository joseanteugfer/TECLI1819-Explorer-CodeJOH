import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translatable',
  templateUrl: './translatable.component.html',
  styleUrls: ['./translatable.component.scss']
})
export class TranslatableComponent implements OnInit {

  constructor(private translate: TranslateService) { 
    let lang = localStorage.getItem('language');

    if(lang === 'null'){
      lang = this.translate.getBrowserLang();
    }
    translate.setDefaultLang(lang);
    this.changeLanguage(lang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
  ngOnInit() {
  }

}
