import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Proizvod } from 'src/app/models/Proizvod';
import { FooterService } from 'src/app/services/footer.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { ProizvodiService } from 'src/app/services/proizvodi.service';
import { SeoService } from 'src/app/services/seo.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit {
  id: any;
  proizvod: Proizvod;
  slicno: Proizvod[];
  nedavno: Proizvod[];
  constructor(private proizvodiService: ProizvodiService,
              private storage: AngularFireStorage,
              private meta: Meta,
              private activatedRoute: ActivatedRoute,
              private footer: FooterService,
              private navbar: NavbarService,
              private router: Router,
              private seo: SeoService) {
              }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.footer.show();
    this.navbar.show();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.id = this.activatedRoute.snapshot.params.id;
    this.proizvodiService.getProizvod('proizvodi', this.id).subscribe(proizvod => {
      this.proizvod = proizvod;
      const ref = this.storage.ref(`Proizvodi/${this.proizvod.Podnaslov}`);
      this.proizvod.Slika = ref.getDownloadURL();
      // tslint:disable-next-line: max-line-length
      // document.getElementById('shareFB').setAttribute('data-href', encodeURIComponent(document.URL));
      // tslint:disable-next-line: max-line-length
      // document.getElementById('shareFBLink').setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL));
      this.proizvodiService.getByKategorija(proizvod.Kategorija).subscribe(slicno => {
        this.slicno = slicno;
        this.slicno.forEach(doc => {
          // tslint:disable-next-line: no-shadowed-variable
          const ref = this.storage.ref(`Proizvodi/${doc.Podnaslov}`);
          doc.Slika = ref.getDownloadURL();
        });
        this.slicno = this.slicno.filter(obj => obj.Id !== proizvod.Id);
      });
      this.storage.ref('Proizvodi/' + this.proizvod.Podnaslov).getDownloadURL().subscribe(slik => {
        this.seo.generateTags({
          title: this.proizvod.Naslov,
          description: jQuery(this.proizvod.Sadrzaj).text(),
          image: slik,
          slug: `proizvod/${this.proizvod.Id}`
        });
      });
    });
    this.proizvodiService.getProizvodi().subscribe(nedavno => {
      this.nedavno = nedavno;
      this.nedavno.forEach(doc => {
        // tslint:disable-next-line: no-shadowed-variable
        const ref = this.storage.ref(`Proizvodi/${doc.Podnaslov}`);
        doc.Slika = ref.getDownloadURL();
      });
    });
  }
}
