import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends TranslatableComponent implements OnInit {

  roleList: string[];
  registerForm: FormGroup;
  showMessageCreated = false;
  showMessageError = false;
  codeError: number;

  name;
  surname;
  email;
  password;
  phone;

  constructor(private authService: AuthService,
              private translatableService: TranslateService,
              private fb: FormBuilder,
              private router: Router) {
      super(translatableService);
      this.roleList = authService.getRoles().filter(rol => rol !== 'MANAGER');
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]+')
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]+')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ])),
      password: new FormControl('',
      Validators.required),
      phone: new FormControl(null, Validators.compose([
        Validators.minLength(9),
        Validators.maxLength(9),
        Validators.pattern('[0-9]+')
      ])),
      roles: new FormControl('EXPLORER', Validators.compose([
        Validators.required
      ]))
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

  onRegister() {
    let actor = this.registerForm.value;
    actor.role = [actor.roles];
    this.authService.registerUser(this.registerForm.value)
      .then(_ => {
        this.displayMessage(false);
      }, error => {
        const errorParams = { };
        errorParams['code'] = error.code ? 422 : error.status;
        this.displayMessage(true, errorParams);
      });
  }

}
