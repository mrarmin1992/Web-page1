import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { KategorijaProizvoda } from 'src/app/models/KategorijaProizvoda';
import { KategorijeProizvodaService } from 'src/app/services/kategorije-proizvoda.service';
import { ProizvodiService } from 'src/app/services/proizvodi.service';

@Component({
  selector: 'app-kategorije-proizvoda-izmjena',
  templateUrl: './kategorije-proizvoda-izmjena.component.html',
  styleUrls: ['./kategorije-proizvoda-izmjena.component.css']
})
export class KategorijeProizvodaIzmjenaComponent implements OnInit {
  stara: string;
  id: string;
  category: string;
  kategorija: KategorijaProizvoda = {
    Naziv: ''
  };
  constructor(private router: Router,
              private route: ActivatedRoute,
              private kategorijeService: KategorijeProizvodaService,
              private fm: FlashMessagesService,
              private proizvodiService: ProizvodiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.kategorijeService.getKategorijaProizvodi(this.id).subscribe(kategorija => {
      this.kategorija = kategorija;
      this.stara = kategorija.Naziv;
    });
  }
  onSubmit({value, valid}: {value: KategorijaProizvoda, valid: boolean}) {
    if (!valid) {
      console.log(valid);
    } else {
        this.kategorijeService.updateKategorijaProizvodi(value, this.id);
        this.proizvodiService.getByKategorija(this.stara).forEach(values => {
          values.forEach(doc => {
            this.proizvodiService.updateKategorija(doc, this.kategorija.Naziv);
          });
        });
        this.fm.show('Kategorija je uspješno izmijenjena', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate([`/dashboard/kategorije-proizvodi`]);
    }
  }
}

