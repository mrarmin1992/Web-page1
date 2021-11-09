import { Component, OnInit } from '@angular/core';
import { Proizvod } from 'src/app/models/Proizvod';
import { ProizvodiService } from 'src/app/services/proizvodi.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.css']
})
export class ProizvodiComponent implements OnInit {
  proizvodi: Proizvod[];

  constructor(private proizvodiService: ProizvodiService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.proizvodiService.getProizvodi().subscribe(proizvodi => {
      proizvodi.forEach(cur => {
        const ref = this.storage.ref(`Proizvodi/${cur.Podnaslov}`);
        cur.Slika = ref.getDownloadURL();
      });
      this.proizvodi = proizvodi;
    });

  }

}
