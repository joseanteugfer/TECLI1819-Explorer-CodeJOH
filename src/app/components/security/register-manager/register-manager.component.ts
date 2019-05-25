import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from 'src/app/services/auth.service';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.scss']
})
export class RegisterManagerComponent extends TranslatableComponent implements OnInit {

  registerForm: FormGroup;
  showMessageCreated = false;
  showMessageError = false;
  codeError: number;

  constructor(private authService: AuthService,
              private translatableService: TranslateService,
              private fb: FormBuilder,
              private router: Router) {
    super(translatableService);
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

  onRegister(): void {
    let actor = this.registerForm.value;
    actor.role = ['MANAGER'];
    this.authService.registerUser(actor)
      .then(_ => {
        this.displayMessage(false);
      }, error => {
        console.log(error);
        const errorParams = { };
        errorParams['code'] = error.code ? 422 : error.status;
        this.displayMessage(true, errorParams);
      });
  }

}
