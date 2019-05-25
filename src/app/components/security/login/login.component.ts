import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends TranslatableComponent implements OnInit {

  loginForm: FormGroup;
  password: string;
  email: string;
  returnUrl: string;
  showMessageCreated = false;
  showMessageError = false;
  codeError: number;


  constructor(private authService: AuthService,
              private translatableService: TranslateService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
                super(translatableService);
                this.loginForm = new FormGroup({
                  email: new FormControl('', Validators.compose([
                    Validators.required
                  ])),
                  password: new FormControl('', Validators.compose([
                    Validators.required
                  ]))
                });
  }

  ngOnInit() {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])),
      password: new FormControl('',
      Validators.required)
    });
  }

  public displayMessage(error: boolean, params?: object): void {
    if (!error) {
      this.showMessageError = false;
      this.showMessageCreated = true;
    } else {
      this.showMessageCreated = false;
      this.showMessageError = true;
      this.codeError = params['code'] ? params['code'] : 500;
    }
  }

  onLogin() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        this.router.navigateByUrl(this.returnUrl);
      }, error => {
        console.log(error);
        const errorParams = { };
        errorParams['code'] = error.code ? 422 : error.status;
        this.displayMessage(true, errorParams);
      });
  }

}
