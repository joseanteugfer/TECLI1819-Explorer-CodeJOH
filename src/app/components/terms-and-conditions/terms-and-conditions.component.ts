import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { TranslatableComponent } from '../shared/translatable/translatable.component';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent extends TranslatableComponent implements OnInit {

  public myTemplate: any;
  private htmlFile: string;

  constructor(private translateService: TranslateService,
              private http: Http,
              private sanitizer: DomSanitizer,
              private router: Router) {
              super(translateService);
  }

  ngOnInit() {
    this.createTemplate();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.createTemplate();
    });
  }

  createTemplate() {
    this.htmlFile = `assets/terms-and-conditions/terms-and-conditions_${this.translateService.currentLang}.html`;
    this.myTemplate = this.http.get(this.htmlFile).subscribe((html) => {
      this.myTemplate = this.sanitizer.bypassSecurityTrustHtml(html.text());
    });
  }

}
