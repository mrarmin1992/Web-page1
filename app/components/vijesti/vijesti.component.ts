import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { VijestiService } from '../../services/vijesti.service';
import { Vijest } from '../../models/Vijest';


@Component({
  selector: 'app-vijesti',
  templateUrl: './vijesti.component.html',
  styleUrls: ['./vijesti.component.css']
})
export class VijestiComponent implements OnInit {
  vijesti: Vijest[];

  constructor(private vijestiService: VijestiService,
              private storage: AngularFireStorage) { }

  ngOnInit() {
    this.vijestiService.getVijesti().subscribe(vijesti => {
      vijesti.forEach(cur => {
        const ref = this.storage.ref(`Vijesti/${cur.Podnaslov}`);
        cur.Slika = ref.getDownloadURL();
      });
      this.vijesti = vijesti;
    });

  }

}
