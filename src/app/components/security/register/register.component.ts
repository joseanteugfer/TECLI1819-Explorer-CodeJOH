import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../shared/translatable/translatable.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends TranslatableComponent implements OnInit {

  roleList: string[];
  name: string;
  surname: string;
  phone: Number;
  email: string;
  password: string;
  departament: string;
  message: string;
  error: boolean;
  registerForm: FormGroup;
  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Nombre requerido' },
      { type: 'pattern', message: 'Sólo puede contener letras' }
    ],
    'surname': [
      { type: 'required', message: 'Apellidos requeridos' },
      { type: 'pattern', message: 'Sólo puede contener letras' }
    ],
    'email': [
      { type: 'required', message: 'Email requerido' },
      { type: 'pattern', message: 'Formato erróneo' }
    ],
    'password': [
      { type: 'required', message: 'Contraseña requerida' }
    ],
    'phone': [
      { type: 'pattern', message: 'Sólo puede contener números' },
      { type: 'minlength', message: 'Mínimo de 9 números' }
    ],
    'roles': [
      { type: 'required', message: 'Rol requerido' }
    ]
  }

  constructor(private authService: AuthService,
              private translatableService: TranslateService,
              private fb: FormBuilder,
              private router: Router) {
      super(translatableService);
      this.roleList = authService.getRoles();
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
        Validators.pattern('[0-9]+')
      ])),
      departament: new FormControl('', Validators.compose([
        Validators.pattern('[a-zA-Z]+')
      ])),
      roles: new FormControl('EXPLORER', Validators.compose([
        Validators.required
      ]))
    });
  }

  onRegister() {
    let actor = this.registerForm.value;
    if (!actor.name || !actor.surname || !actor.email || !actor.password || !actor.roles) {
      this.error = true;
      this.message = 'Completar campos requeridos';
      return;
    }
    actor.role = [actor.roles];
    this.authService.registerUser(this.registerForm.value)
      .then(res => {
        this.router.navigate(['login']);
      }, err => {
        if (err.message){
          this.error = true;
          this.message = err.message;
        }
      });
  }

}
