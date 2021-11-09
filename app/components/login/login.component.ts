import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { ComfirmationDialogService } from '../confirmation-dialog/comfirmation-dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(public authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService) {
  }

  ngOnInit(): void {
   /* if (this.auth.isLoggedIn === true) {
      this.router.navigate(['/dashboard']);
    }*/
  }
  onSubmit() {
    this.authService.login(this.email, this.password)
    .then(res => {
      this.flashMessage.show('You are logged in', { cssClass: 'alert-success', Timeout: 4000});
      this.router.navigate(['/']);
    })
    . catch(err => {
      this.flashMessage.show(err.message, { cssClass: 'alert-danger', Timeout: 4000});
    });
  }
  /*resetPassword() {
    this.auth.getAuth().subscribe(auth => {
      if (auth) {
        this.email = auth.email;
      }
    });
    if (!this.email) {
      this.cds.alert('', 'Unesite prvo Vaš email.');
    }
    this.auth.resetPasswordInit(this.email)
    .then(
      () => this.cds.alert('', 'Link za resetovanje pasvorda je poslan na Vašu email adresu.'),
      (rejectionReason) => this.cds.alert('', rejectionReason))
    .catch(e => this.cds.alert('', 'Desila se greška prilikom pokušaja resetovanja Vašeg pasvorda.'));
}} }*/
}
