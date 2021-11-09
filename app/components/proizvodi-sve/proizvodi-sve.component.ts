import { Component, OnInit } from '@angular/core';
import { Proizvod } from 'src/app/models/Proizvod';
import { ProizvodiService } from 'src/app/services/proizvodi.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-proizvodi-sve',
  templateUrl: './proizvodi-sve.component.html',
  styleUrls: ['./proizvodi-sve.component.css']
})
export class ProizvodiSveComponent implements OnInit {
  proizvodi: Proizvod[];
  pageOfItems: Array<any>;
  pageSize = 12;
  items = [];
  constructor(private proizvodiService: ProizvodiService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.proizvodiService.getProizvodi().subscribe(proizvodi => {
      this.proizvodi = proizvodi;
      this.proizvodi.forEach(doc => {
        const ref = this.storage.ref(`Proizvodi/${doc.Podnaslov}`);
        doc.Slika = ref.getDownloadURL();
        doc.Sadrzaj = doc.Sadrzaj.substring(0, 400);
        doc.Sadrzaj = jQuery(doc.Sadrzaj).text();
      });
      // tslint:disable-next-line: max-line-length
      this.items = this.proizvodi.map((x, i) => ({ id: (i + 1), Naslov: x.Naslov, Id: x.Id, Podnaslov: x.Podnaslov, Slika: x.Slika, Kategorija: x.Kategorija, Sadrzaj: x.Sadrzaj, Datum: x.Datum, Objava: x.Objava}));
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}
}

