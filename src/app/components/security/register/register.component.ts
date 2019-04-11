import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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

  registrationForm: FormGroup;
  roleList: string[];

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
    this.registrationForm = this.fb.group({
      name: new FormControl(''),
      surname: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: [''],
      role: [this.roleList.find(x => x === 'EXPLORER')],
      validated: ['true'],
    });
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value)
      .then(res => {
        console.log(res);
        this.router.navigate(['login']);
      }, err => {
        console.log(err);
      });
  }

}
