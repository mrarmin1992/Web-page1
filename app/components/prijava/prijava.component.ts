import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery/dist/jquery.min.js';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { PrijavaService } from '../../services/prijava.service';
import { ComfirmationDialogService } from '../confirmation-dialog/comfirmation-dialog.service';
import { Prijava } from '../../models/Prijava';




@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {
  captchaVerifier: firebase.auth.RecaptchaVerifier;
  bool: any;
  objava: string;
  naziv: string;
  id: string;
  prijava: Prijava = {
    Ime: '',
    Prezime: '',
    DatumRodjenja: '',
    DatumPrijave: new Date().toDateString(),
    Adresa: '',
    JMBG: '',
    Email: '',
    Telefon: '',
    Zanimanje: '',
    Znanje: '',
    EventId: '',
    Objava: ''
  };
  constructor(private prijavaService: PrijavaService,
              private router: Router,
              private route: ActivatedRoute,
              private cds: ComfirmationDialogService,
              private auth: AngularFireAuth) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.id = this.route.snapshot.params.id;
    this.bool = this.route.snapshot.params.p;

    }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.cds.alert('Validacija', 'Popunite sva tražena polja');
    } else {
      this.prijava.EventId = this.id;
      this.prijava.EventNaziv = this.naziv;
      this.prijava.Objava = this.objava;
      this.prijavaService.dodajPrijavu(this.prijava);
      this.router.navigate(['/hvala']);
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
