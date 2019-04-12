import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
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
  message: string;
  error: boolean;
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Email requerido' }
    ],
    'password': [
      { type: 'required', message: 'Nombre de concepto requerido' },
      { type: 'pattern', message: 'El nombre de concepto sólo puede conteneres letras' }
    ]
  }


  constructor(private authService: AuthService,
              private translatableService: TranslateService,
              private fb: FormBuilder,
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
    const userToken = localStorage.getItem('token');
    if (userToken) {
      this.router.navigate(['trips']);
    }
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then(res => {
        console.log(res);
        this.error = false;
        this.message = res.message;
        this.router.navigate(['trips']);
      }, err => {
        if (err.message){
          this.error = true;
          this.message = err.statusText;
         }
        console.log(err);
      });
  }

}
