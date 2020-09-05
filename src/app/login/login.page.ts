import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  usarnamePattern = /^[a-z0-9]+$/i;
  passwordPattern = /^[a-z]+$/i;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
          Validators.pattern(this.usarnamePattern)
        ]
      ),
      password: new FormControl(
        null,
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
          Validators.pattern(this.usarnamePattern)
        ]
      )
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.storage.set('token', {
        user: this.loginForm.controls['username'].value,
        password: this.loginForm.controls['password'].value
      }).then(res => {
        return this.navCtrl.navigateRoot('home');
      });
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }

  showError(formGroup: FormGroup, fieldName) {
    return this.getControls(formGroup)[fieldName].invalid
    && (this.getControls(formGroup)[fieldName].touched || this.getControls(formGroup)[fieldName].dirty);
  }

  getControls(formGroup: FormGroup) {
    return formGroup.controls;
  }

  getErrorMessage(formField) {
    switch (formField) {
      case 'username':
        const usernameErrors = this.getControls(this.loginForm).username.errors;
        if (usernameErrors && usernameErrors.required) {
          return 'Username is required';
        } else if (usernameErrors && usernameErrors.maxlength) {
          return 'Maximum 20 characters';
        } else if (usernameErrors && usernameErrors.minlength) {
          return 'Minimum 4 characters';
        } else if (usernameErrors && usernameErrors.pattern) {
          return 'Allowed characters: a-z A-Z 0-9';
        }
        break;
      case 'password':
        const passwordErrors = this.getControls(this.loginForm).password.errors;
        if (passwordErrors && passwordErrors.required) {
          return 'Password is required';
        } else if (passwordErrors && passwordErrors.maxlength) {
          return 'Maximum 20 characters';
        } else if (passwordErrors && passwordErrors.minlength) {
          return 'Minimum 6 characters';
        } else if (passwordErrors && passwordErrors.pattern) {
          return 'Allowed characters: a-z A-Z 0-9';
        }
        break;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
      }
    });
  }
}
