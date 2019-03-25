import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  roleList: string[];

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { 
      this.roleList = authService.getRoles();
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: [''],
      role: [''],
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
