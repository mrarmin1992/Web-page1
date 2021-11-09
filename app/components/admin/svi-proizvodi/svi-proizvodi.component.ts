import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { KategorijaProizvoda } from 'src/app/models/KategorijaProizvoda';
import { Proizvod } from 'src/app/models/Proizvod';
import { KategorijeProizvodaService } from 'src/app/services/kategorije-proizvoda.service';
import { ProizvodiService } from 'src/app/services/proizvodi.service';
import { ComfirmationDialogService } from '../../confirmation-dialog/comfirmation-dialog.service';

@Component({
  selector: 'app-svi-proizvodi',
  templateUrl: './svi-proizvodi.component.html',
  styleUrls: ['./svi-proizvodi.component.css']
})
export class SviProizvodiComponent implements OnInit {
  pretraga = '';
  selected = 'Svi proizvodi';
  filter: Proizvod[] = [];
  proizvodi: Proizvod[];
  kategorije: KategorijaProizvoda[];
  constructor(private proizvodiService: ProizvodiService,
              private kategorijeService: KategorijeProizvodaService,
              private cds: ComfirmationDialogService,
              private fm: FlashMessagesService) { }

  ngOnInit(): void {
    this.proizvodiService.getProducts().subscribe(proizvodi => {
      this.proizvodi = proizvodi;
    });
    this.kategorijeService.getKategorijeProizvodi().subscribe(kategorije => {
      this.kategorije = kategorije;
    });
  }
  onChange() {
    this.proizvodiService.getByKategorija(this.selected).subscribe(proizvodi => {
      this.proizvodi = proizvodi;
    });
  }
  pretrazi() {
    if (this.pretraga === '') {this.proizvodiService.getProducts().subscribe(proizvodi => {
      this.proizvodi = proizvodi;
    }); } else {
      this.proizvodiService.getProducts().subscribe(proizvodi => {
        this.proizvodi = proizvodi;
        this.filter = this.proizvodi.filter((proizvod: Proizvod) => proizvod.Naslov.toLowerCase().includes(this.pretraga.toLowerCase()));
        this.proizvodi = this.filter;
      });
    }
  }
  onDeleteClick(proizvod: Proizvod) {
    this.cds.confirm('Pažnja', `Jeste li sigurni da želite obrisati proizvod ${proizvod.Naslov} ?`)
    .then(confirmed => {
      if (confirmed === false) {
        this.fm.show('Proizvo je uspješno obrisan', {cssClass: 'alert-success', timeout: 3000});
        this.proizvodiService.DeleteProizvod(proizvod);
      }
    });
  }
}

