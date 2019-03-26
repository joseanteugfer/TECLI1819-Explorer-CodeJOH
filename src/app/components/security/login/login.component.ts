import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
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
        this.router.navigate(['login']);
      }, err => {
        console.log(err);
      });
  }

}
