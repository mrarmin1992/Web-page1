import { Component, OnInit } from '@angular/core';
import { VijestiService } from 'src/app/services/vijesti.service';
import { PublikacijeService } from '../../../services/publikacije.service';
import { PrijavaService } from '../../../services/prijava.service';
import { Vijest } from 'src/app/models/Vijest';
import { Publikacija } from '../../../models/Publikacija';
import { Prijava } from '../../../models/Prijava';
import { ProizvodiService } from 'src/app/services/proizvodi.service';
import { Proizvod } from 'src/app/models/Proizvod';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.css']
})
export class DashboardIndexComponent implements OnInit {
  brojPrijava: any;
  prijave: Prijava[];
  brojVijesti: any;
  vijesti: Vijest[];
  proizvodi: Proizvod[];
  brojProizvoda: any;
  constructor(private vijestiService: VijestiService,
              private publikacijeService: PublikacijeService,
              private prijaveService: PrijavaService,
              private proizvodiService: ProizvodiService) { }

  ngOnInit(): void {
    this.prijaveService.getPrijave().subscribe(prijave => {
      this.prijave = prijave;
      this.brojPrijava = prijave.length;
    });
    this.vijestiService.getProducts().subscribe(vijesti => {
      this.vijesti = vijesti;
      this.brojVijesti = vijesti.length;
    });
    this.proizvodiService.getProducts().subscribe(proizvodi => {
      this.proizvodi = proizvodi;
      this.brojProizvoda = proizvodi.length;
    });
  }

}
