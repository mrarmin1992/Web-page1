import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Aktivni } from '../../models/Aktivni';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ukljuci-se',
  templateUrl: './ukljuci-se.component.html',
  styleUrls: ['./ukljuci-se.component.css']
})
export class UkljuciSeComponent implements OnInit {
  temp: Aktivni;
  aktivni: Aktivni[] = [];
  constructor(
              private storage: AngularFireStorage,
              ) { }

  ngOnInit() {
    const slik = this.storage.ref('onama.jpg');
    console.log(slik);
    // tslint:disable-next-line: max-line-length
    this.aktivni.push({Id: undefined, Naslov: 'Lokalno partnerstvo za obrazovanje odraslih', Opis: '', Slika: slik.getDownloadURL(), Vrsta: null, Dugme: 'O nama'});
  }
}
