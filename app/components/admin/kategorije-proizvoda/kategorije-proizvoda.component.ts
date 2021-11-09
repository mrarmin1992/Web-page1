import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { KategorijaProizvoda } from 'src/app/models/KategorijaProizvoda';
import { KategorijeProizvodaService } from 'src/app/services/kategorije-proizvoda.service';
import { ComfirmationDialogService } from '../../confirmation-dialog/comfirmation-dialog.service';

@Component({
  selector: 'app-kategorije-proizvoda',
  templateUrl: './kategorije-proizvoda.component.html',
  styleUrls: ['./kategorije-proizvoda.component.css']
})
export class KategorijeProizvodaComponent implements OnInit {

  kategorijaProizvoda: KategorijaProizvoda[];
  constructor(private kategorije: KategorijeProizvodaService,
              private fm: FlashMessagesService,
              private cds: ComfirmationDialogService) { }

  ngOnInit(): void {
    this.kategorije.getKategorijeProizvodi().subscribe(kategorije => {
      this.kategorijaProizvoda = kategorije;
    });
  }
  onDeleteClick(kategorija: KategorijaProizvoda) {
    this.cds.confirm('Pažnja', `Jeste li sigurni da želite obrisati kategoriju ${kategorija.Naziv} ?`)
    .then(confirmed => {
      if (confirmed === false) {
        this.fm.show('Kategorija je uspješno obrisana', {cssClass: 'alert-success', timeout: 3000});
        this.kategorije.deleteKategorijaProizvodi(kategorija.Id);
      }
    });
  }
}
