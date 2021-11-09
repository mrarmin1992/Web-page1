import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VijestiService } from '../../services/vijesti.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Vijest } from 'src/app/models/Vijest';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {
  filter: any;
  pretraga: any;
  vijesti: Vijest[];


  constructor(private vijestiService: VijestiService,
              private storage: AngularFireStorage,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pretraga = this.route.snapshot.params.p;

    this.vijestiService.getVijesti().subscribe(vijesti => {
      this.vijesti = vijesti;
      this.filter = this.vijesti.filter((vijest: Vijest) => vijest.Naslov.toLowerCase().includes(this.pretraga.toLowerCase()));
      this.vijesti = this.filter;
      this.vijesti.forEach(doc => {
        const ref = this.storage.ref(`Vijesti/${doc.Podnaslov}`);
        doc.Slika = ref.getDownloadURL();
        doc.Sadrzaj = doc.Sadrzaj.substring(0, 400);
        doc.Sadrzaj = jQuery(doc.Sadrzaj).text();
      });
    });
  }

}
