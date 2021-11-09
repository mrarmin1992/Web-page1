import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { KategorijaProizvoda } from 'src/app/models/KategorijaProizvoda';
import { KategorijeProizvodaService } from 'src/app/services/kategorije-proizvoda.service';

@Component({
  selector: 'app-kategorije-proizvoda-add',
  templateUrl: './kategorije-proizvoda-add.component.html',
  styleUrls: ['./kategorije-proizvoda-add.component.css']
})
export class KategorijeProizvodaAddComponent implements OnInit {

  kategorija: KategorijaProizvoda = {
    Naziv: ''
  };
  constructor(private kategorije: KategorijeProizvodaService,
              private router: Router,
              private fm: FlashMessagesService) { }

  ngOnInit(): void {
  }
  onSubmit({value, valid}: {value: KategorijaProizvoda, valid: boolean}) {
    if (!valid) {
      console.log(value);
    } else {
      this.kategorije.addkategorijaProizvodi(this.kategorija);
      this.fm.show('Nova kategorija je uspješno dodana', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate([`dashboard/kategorije-proizvodi`]);
    }
  }
}
